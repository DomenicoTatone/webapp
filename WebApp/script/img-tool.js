// Gestione del drag & drop
const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('click', () => {
    document.getElementById('image-input').click();
});
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false); // Previene l'apertura del file trascinato in una nuova scheda nel browser
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}


function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    preventDefaults(e);
    const dt = e.dataTransfer;
    const files = dt.files; // Questo è un oggetto FileList, che è iterabile
    handleFiles(files); // Assicurati che questa chiamata passi un oggetto iterabile
}


document.getElementById('image-input').addEventListener('change', function() {
    handleFiles(this.files);
}, false);

function handleFiles(files) {
    files = files || this.files;
    Array.from(files).forEach(compressAndDisplayImage);
}

function getCompressionFactor(sizeBytes) {
    // Converti la dimensione da bytes a megabytes
    const sizeMB = sizeBytes / 1024 / 1024;

    // Definisci dei range di dimensione e i corrispondenti fattori di compressione
    if (sizeMB <= 1) { // Immagini fino a 1 MB
        return 0.60; // Qualità alta perché l'immagine è già di piccole dimensioni
    } else if (sizeMB <= 5) { // Immagini da 1 a 5 MB
        return 0.50;
    } else if (sizeMB <= 10) { // Immagini da 5 a 10 MB
        return 0.40;
    } else { // Immagini maggiori di 10 MB
        return 0.30; // Aumenta la compressione per immagini molto grandi
    }
    // Aggiungi altri range e fattori di compressione se necessario
}

function compressAndDisplayImage(file) {
    const originalSizeBytes = file.size;
    const originalSize = originalSizeBytes / 1024 / 1024 > 1 ? 
        (originalSizeBytes / 1024 / 1024).toFixed(2) + ' MB' : 
        (originalSizeBytes / 1024).toFixed(2) + ' KB';

    // Utilizza la funzione getCompressionFactor per determinare il fattore di compressione
    const compressionFactor = getCompressionFactor(originalSizeBytes);

    const reader = new FileReader();
    reader.onload = function(event) {
        const originalImageSrc = event.target.result;

        const imgElement = document.createElement('img');
        imgElement.src = originalImageSrc;
        imgElement.onload = function() {
            const pica = window.pica();
            const offScreenCanvas = document.createElement('canvas');
            offScreenCanvas.width = imgElement.width;
            offScreenCanvas.height = imgElement.height;

            pica.resize(imgElement, offScreenCanvas)
                .then(result => pica.toBlob(result, 'image/jpeg', compressionFactor)) // Usa il fattore di compressione
                .then(blob => {
                    const compressedImageSrc = URL.createObjectURL(blob);
                    const compressedSizeBytes = blob.size;
                    const compressedSize = compressedSizeBytes / 1024 / 1024 > 1 ? 
                        (compressedSizeBytes / 1024 / 1024).toFixed(2) + ' MB' : 
                        (compressedSizeBytes / 1024).toFixed(2) + ' KB';

                    const reductionPercentage = ((1 - compressedSizeBytes / originalSizeBytes) * 100).toFixed(2);

                    // Creazione della card
                    const imageContainer = document.getElementById('images-container');
                    const card = document.createElement('div');
                    card.className = 'card';
                    
                    // Anteprima dell'immagine compressa
                    const compressedImagePreview = document.createElement('img');
                    compressedImagePreview.src = compressedImageSrc;
                    compressedImagePreview.style.maxWidth = '100px';
                    compressedImagePreview.style.maxHeight = '100px';
                    card.appendChild(compressedImagePreview);

                    // Percentuale di riduzione
                    const reductionPercentageText = document.createElement('p');
                    reductionPercentageText.textContent = `Ridotto del ${reductionPercentage}%`;
                    card.appendChild(reductionPercentageText);

                    // Pulsante di confronto con titoli e dimensioni
                    const compareButton = document.createElement('button');
                    compareButton.textContent = 'Confronta';
                    compareButton.onclick = () => openPhotoSwipe(
                        originalImageSrc, 
                        compressedImageSrc, 
                        originalSize, 
                        `${compressedSize} - Ridotto del ${reductionPercentage}%`
                    );
                    card.appendChild(compareButton);
                    
                    // Pulsante di download
                    addDownloadButton(card, blob, file.name);

                    // Aggiunta della card al container
                    imageContainer.appendChild(card);
                });
        };
    };
    reader.readAsDataURL(file);
}

function addDownloadButton(card, blob, fileName) {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download';
    downloadButton.addEventListener('click', () => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Usa il nome del file originale
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    card.appendChild(downloadButton);
}

document.getElementById('download-all').addEventListener('click', function() {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");

    document.querySelectorAll('.card img').forEach((img, index) => {
        const imgURL = img.getAttribute('src');
        fetch(imgURL)
            .then(response => response.blob())
            .then(blob => {
                imgFolder.file(`image${index}.jpg`, blob, {binary: true});
                // Controlla se siamo all'ultimo elemento
                if (index === document.querySelectorAll('.card img').length - 1) {
                    zip.generateAsync({type:"blob"})
                        .then(function(content) {
                            saveAs(content, "compressed_images.zip");
                        });
                }
            });
    });
});

function openPhotoSwipe(originalImageSrc, compressedImageSrc, originalSize, compressedSize) {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // Aggiorna gli items con i titoli e le dimensioni specifici per ciascuna immagine
    var items = [
        {
            src: originalImageSrc,
            w: 0, // larghezza iniziale, verrà aggiornata
            h: 0, // altezza iniziale, verrà aggiornata
            title: `Immagine Originale - ${originalSize}` // Includi le dimensioni nel titolo
        },
        {
            src: compressedImageSrc,
            w: 0, // larghezza iniziale, verrà aggiornata
            h: 0, // altezza iniziale, verrà aggiornata
            title: `Immagine Compressa - ${compressedSize}` // Includi le dimensioni nel titolo
        }
    ];

    // Carica le immagini per ottenere dimensioni reali
    items.forEach((item, index) => {
        var img = new Image();
        img.onload = function() {
            item.w = this.naturalWidth;
            item.h = this.naturalHeight;
            // Dopo che l'ultima immagine è stata caricata, apri PhotoSwipe
            if (index === items.length - 1) {
                openGallery(items);
            }
        };
        img.src = item.src;
    });

    // Funzione per aprire PhotoSwipe
    function openGallery(items) {
        var options = {
            index: 0,
            bgOpacity: 0.7,
            showHideOpacity: true
        };
    
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    
        // Imposta il titolo iniziale per l'elemento corrente appena PhotoSwipe è stato inizializzato
        updateTitleOverlay(gallery.currItem);
    
        // Aggiorna dinamicamente il titolo nell'overlay ogni volta che cambia l'immagine visualizzata
        gallery.listen('afterChange', function() {
            updateTitleOverlay(gallery.currItem);
        });
    }
    
    function updateTitleOverlay(item) {
        document.querySelector('.pswp__title-overlay').innerHTML = item.title || '';
    }
}
