// Initial cloud files
let files = [
    {
        id: 1,
        name: "Project Report.pdf",
        type: "PDF",
        size: 2.4
    },
    {
        id: 2,
        name: "Presentation.pptx",
        type: "PPTX",
        size: 1.2
    },
    {
        id: 3,
        name: "Cloud Architecture.png",
        type: "Image",
        size: 0.8
    },
    {
        id: 4,
        name: "Database.sql",
        type: "SQL",
        size: 0.6
    }
];

const fileList = document.getElementById("fileList");
const fileInput = document.getElementById("fileInput");
const searchInput = document.getElementById("searchInput");
const sortFiles = document.getElementById("sortFiles");
const fileCount = document.getElementById("fileCount");
const usedStorage = document.getElementById("usedStorage");


// Display files
function displayFiles(data = files) {

    fileList.innerHTML = "";

    data.forEach(file => {

        const row = document.createElement("div");

        row.className = "file-row";

        row.innerHTML = `
            <div class="file-name">
                <div class="file-icon">📄</div>
                <span>${file.name}</span>
            </div>

            <span>${file.type}</span>

            <span>${file.size.toFixed(1)} MB</span>

            <button class="delete-btn"
                    onclick="deleteFile(${file.id})">
                Delete
            </button>
        `;

        fileList.appendChild(row);
    });

    updateStatistics();
}


// Delete file
function deleteFile(id) {

    files = files.filter(file => file.id !== id);

    displayFiles();

}


// Upload file
fileInput.addEventListener("change", function () {

    const selectedFile = this.files[0];

    if (!selectedFile) {
        return;
    }

    const fileSize = selectedFile.size / (1024 * 1024);

    let fileType = selectedFile.name
        .split(".")
        .pop()
        .toUpperCase();

    const newFile = {

        id: Date.now(),

        name: selectedFile.name,

        type: fileType,

        size: fileSize
    };

    files.push(newFile);

    displayFiles();

    alert("File uploaded successfully to the cloud!");

    fileInput.value = "";
});


// Search files
searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchText)
    );

    displayFiles(filteredFiles);
});


// Sort files
sortFiles.addEventListener("change", function () {

    let sortedFiles = [...files];

    if (this.value === "name") {

        sortedFiles.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else if (this.value === "size") {

        sortedFiles.sort((a, b) =>
            b.size - a.size
        );

    } else if (this.value === "type") {

        sortedFiles.sort((a, b) =>
            a.type.localeCompare(b.type)
        );
    }

    displayFiles(sortedFiles);
});


// Update statistics
function updateStatistics() {

    fileCount.textContent = files.length;

    let totalSize = files.reduce(
        (total, file) => total + file.size,
        0
    );

    usedStorage.textContent =
        (4.2 + totalSize / 1000).toFixed(2);

}


// Start application
displayFiles();
