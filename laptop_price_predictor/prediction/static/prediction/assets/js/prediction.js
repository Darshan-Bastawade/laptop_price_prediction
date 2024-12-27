
  function setupAutocomplete(inputId, jsonFilePath, hiddenInputId) {
    // Fetch JSON data for the field
    fetch(jsonFilePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const brandMapping = data; // Store the mapping
        const brandLabels = Object.keys(brandMapping); // Extract brand names
        initializeAutocomplete(inputId, brandLabels, brandMapping, hiddenInputId);
      })
      .catch(error => console.error(`Error loading data from ${jsonFilePath}:`, error));
  }

  function initializeAutocomplete(inputId, brandLabels, brandMapping, hiddenInputId) {
    $(`#${inputId}`).autocomplete({
      source: function (request, response) {
        // Filter brand names based on user input
        const filteredBrands = brandLabels.filter(brand =>
          brand.toLowerCase().includes(request.term.toLowerCase())
        );
        response(filteredBrands);
      },
      minLength: 2, // Minimum input length set to 2
      select: function (event, ui) {
        const selectedBrand = ui.item.value;
        const brandId = brandMapping[selectedBrand]; // Get the corresponding brand ID

        $(`#${inputId}`).val(selectedBrand); // Set the selected brand name
        $(`#${hiddenInputId}`).val(brandId); // Set the hidden input with the brand ID

        return false; // Prevent default behavior
      },
     appendTo: "#autocomplete-container", // Attach the autocomplete dropdown to this container
      open: function(event, ui) {
        const dropdown = $(this).autocomplete("widget");
        const maxHeight = 200; // Set the desired maximum height of the dropdown
        const itemCount = dropdown.find("li").length;
        const maxVisibleItems = 10; // Adjust based on desired visibility

        if (itemCount > maxVisibleItems) {
          dropdown.css("max-height", `${maxHeight}px`);
          dropdown.css("overflow-y", "auto");
        } else {
          dropdown.css("max-height", "");
          dropdown.css("overflow-y", "");
        }
      }
    });

    // Validate input on blur
    $(`#${inputId}`).on("blur", function () {
      const inputValue = $(this).val();
      if (!brandLabels.includes(inputValue)) {
        alert("Invalid option selected. Please choose a valid option from the list.");
        $(this).val(''); // Clear invalid input
        $(`#${hiddenInputId}`).val(''); // Clear the hidden input
      }
    });
  }

  // Initialize autocomplete for multiple fields
  setupAutocomplete('laptop-brand', '/static/prediction/assets/data/brand_mapping.json', 'laptop-brand-id');
  setupAutocomplete('laptop-processor', '/static/prediction/assets/data/processor_mapping.json', 'laptop-processor-id');
  setupAutocomplete('laptop-graphics', '/static/prediction/assets/data/graphics_mapping.json', 'laptop-graphics-id');
  setupAutocomplete('laptop-os', '/static/prediction/assets/data/os_mapping.json', 'laptop-os-id');
  setupAutocomplete('laptop-resolution', '/static/prediction/assets/data/resolution_mapping.json', 'laptop-resolution-id');

