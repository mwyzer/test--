$(document).ready(function() {
    // Initialize DataTable with search feature
    var table = $('#activityTable').DataTable({
        "paging": true, // Enable pagination
        "ordering": true, // Enable ordering of columns
        "info": true, // Show info (records x of y)
        "responsive": true, // Enable responsive design
        "searching": true, // Enable default search feature
        "columnDefs": [
            { targets: [3], searchable: true }, // Site Code column (zero-indexed)
            { targets: [1], searchable: true }, // Submitted By column (zero-indexed)
            { targets: [4], searchable: true }, // Activity column (zero-indexed)
            { targets: [10], searchable: true } // Mesin ID column (zero-indexed)
        ]
    });

    // Custom filtering function for Month, Submitted By, Site Code, Activity, and Mesin ID
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var selectedMonth = $('#monthFilter').val();
            var selectedSubmittedBy = $('#submittedByFilter').val();
            var selectedSiteCode = $('#siteCodeFilter').val();
            var selectedActivity = $('#activityFilter').val().toLowerCase(); // Convert to lower case for case-insensitive search
            var selectedMesinId = $('#mesinIdFilter').val();

            var date = data[2]; // Submitted When column
            var month = date.split('-')[1];
            var submittedBy = data[1]; // Submitted By column
            var siteCode = data[3]; // Site Code column
            var activity = data[4].toLowerCase(); // Activity column
            var mesinId = data[10]; // Mesin ID column

            if ((selectedMonth === "" || month === selectedMonth) &&
                (selectedSubmittedBy === "" || submittedBy === selectedSubmittedBy) &&
                (selectedSiteCode === "" || siteCode === selectedSiteCode) &&
                (selectedActivity === "" || activity.includes(selectedActivity)) &&
                (selectedMesinId === "" || mesinId === selectedMesinId)) {
                return true;
            }
            return false;
        }
    );

    // Apply custom filters on dropdown change
    $('#monthFilter, #submittedByFilter, #siteCodeFilter, #activityFilter, #mesinIdFilter').on('change', function() {
        table.draw();
    });

    // Apply search box filter
    $('#searchBox').on('keyup', function() {
        table.search(this.value).draw();
    });
});
