Webflow.push(function () {
  // Setup form validation
  $('[data-validate-form="true"]').each(function () {
    const $form = $(this);

    $form.validate({
      errorPlacement: function (error, element) {
        error.appendTo(element.closest("[data-errorplace='true']"));
      },
      onkeyup: function (element) {
        $(element).valid(); // triggers validation on each keypress
      },
      rules: {
        URL: {
          required: true,
          url: true,
        },
      },
      messages: {
        URL: {
          required: "Website URL is required",
          url: "Please enter a valid URL",
        },
      },
    });
  });

  // Page URL logic
  const pageUrl = document.querySelector('[fs-hacks-element="show-page-url"]');
  const pageUrlInput = document.querySelector(
    '[fs-hacks-element="page-url-input"]'
  );
  if (pageUrl && pageUrlInput) {
    const url = location.href;
    pageUrlInput.value = url;
    pageUrl.innerText = url;
  }

  // Reload button
  $('[data-reload="true"]').on("click", function () {
    location.reload();
  });
});
