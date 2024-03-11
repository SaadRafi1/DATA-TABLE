document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('th');

    headers.forEach(function(header, index) {
        header.addEventListener('click', function() {
            sortTable(index, header);
        });
    });

    function sortTable(columnIndex, clickedHeader) {
        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tr');
        const sortedRows = Array.from(rows).slice(1);

        const sortType = clickedHeader.dataset.sort === 'asc' ? 'desc' : 'asc';
        clickedHeader.dataset.sort = sortType;

        const dataType = clickedHeader.dataset.type;

        sortedRows.sort((a, b) => {
            let aValue = a.children[columnIndex].textContent.trim();
            let bValue = b.children[columnIndex].textContent.trim();

            if (dataType === 'number') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }

            if (sortType === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        table.appendChild(rows[0]);
        sortedRows.forEach(row => {
            table.appendChild(row);
        });
    }
});
