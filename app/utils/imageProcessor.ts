/**
 * Processador de Imagens Otimizado (Native Browser Strategy)
 * Realiza crop, resize, sharpen e conversão para AVIF nativamente.
 */

// Helper para carregar imagem
function loadImage(src: string | Blob | File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Erro ao carregar a imagem base."));

        if (typeof src !== 'string') {
            const url = URL.createObjectURL(src);
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.src = url;
        } else if (typeof src === 'string') {
            img.src = src;
        } else {
            reject(new Error("Fonte de imagem inválida"));
        }
    });
}

// Filtro de Nitidez (Sharpen)
function applySharpnessFilter(canvas: HTMLCanvasElement, strength = 0.2) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    const width = canvas.width;
    const height = canvas.height;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const originalData = new Uint8ClampedArray(data);

    // Kernel de nitidez simples
    const kernel = [
        [0, -1, 0],
        [-1, 4, -1],
        [0, -1, 0],
    ];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            for (let c = 0; c < 3; c++) {
                // R, G, B
                let edgeValue = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const pixelIndex = ((y + ky) * width + (x + kx)) * 4 + c;
                        // Protected access
                        const val = originalData[pixelIndex];
                        const kernelRow = kernel[ky + 1];
                        if (val !== undefined && kernelRow) {
                            const kernelVal = kernelRow[kx + 1];
                            if (kernelVal !== undefined) {
                                edgeValue += val * kernelVal;
                            }
                        }
                    }
                }
                const currentIndex = (y * width + x) * 4 + c;
                const originalValue = originalData[currentIndex];
                if (originalValue !== undefined) {
                    data[currentIndex] = Math.max(
                        0,
                        Math.min(255, originalValue + strength * edgeValue),
                    );
                }
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

// Converter Canvas para Blob AVIF (Nativo)
// Converter Canvas para Blob (AVIF -> WebP)
async function optimizeCanvas(canvas: HTMLCanvasElement): Promise<Blob> {
    // 1. Tentar AVIF (Prioridade - Menor tamanho)
    try {
        const avifBlob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/avif", 0.6);
        });

        if (avifBlob && avifBlob.type === "image/avif" && avifBlob.size > 0) {
            console.log("🚀 [Otimização] Usando codificador AVIF nativo!");
            return avifBlob;
        }
    } catch (e) {
        console.warn("⚠️ AVIF nativo falhou ou não suportado.", e);
    }

    // 2. Fallback para WebP (Alta compatibilidade)
    try {
        const webpBlob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/webp", 0.8);
        });

        if (webpBlob && webpBlob.type === "image/webp" && webpBlob.size > 0) {
            console.log("⚠️ [Otimização] Fallback para WebP (AVIF indisponível).");
            return webpBlob;
        }
    } catch (e) {
        console.error("❌ Erro ao converter para WebP:", e);
    }

    throw new Error("Seu navegador não suporta codificação de imagem moderna (AVIF ou WebP).");
}

// --- Funções Exportadas ---

export async function processCircularImage(imageFile: File | Blob): Promise<Blob> {
    console.time("Processamento Circular");
    try {
        const img = await loadImage(imageFile);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("Contexto 2D não disponível.");

        canvas.width = 1024;
        canvas.height = 1024;

        // Crop Centralizado
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;

        // Máscara Circular
        ctx.beginPath();
        ctx.arc(512, 512, 512, 0, 2 * Math.PI);
        ctx.clip();

        // Desenho
        ctx.drawImage(img, x, y, size, size, 0, 0, 1024, 1024);

        // Filtro
        applySharpnessFilter(canvas, 0.2);

        // Codificação
        const result = await optimizeCanvas(canvas);
        console.timeEnd("Processamento Circular");
        return result;
    } catch (error) {
        console.error("Erro no processamento circular:", error);
        throw error;
    }
}

export async function processWideImage(imageFile: File | Blob): Promise<Blob> {
    console.time("Processamento Wide");
    try {
        const img = await loadImage(imageFile);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("Contexto 2D não disponível.");

        canvas.width = 2000;
        canvas.height = 857;

        // Lógica de "Cover" (Preencher sem distorcer)
        const targetRatio = canvas.width / canvas.height;
        const sourceRatio = img.width / img.height;

        let drawWidth, drawHeight, drawX, drawY;

        if (sourceRatio > targetRatio) {
            drawHeight = canvas.height;
            drawWidth = (img.width * canvas.height) / img.height;
            drawX = (canvas.width - drawWidth) / 2;
            drawY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = (img.height * canvas.width) / img.width;
            drawX = 0;
            drawY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        applySharpnessFilter(canvas, 0.2);

        const result = await optimizeCanvas(canvas);
        console.timeEnd("Processamento Wide");
        return result;
    } catch (error) {
        console.error("Erro no processamento wide:", error);
        throw error;
    }
}
