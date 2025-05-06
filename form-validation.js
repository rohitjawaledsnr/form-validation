Webflow.push(function () {
  // ✅ Add custom method to support minchecked via attribute
  $.validator.addMethod("minchecked", function (value, element, param) {
    return $("input[name='" + element.name + "']:checked").length >= param;
  });

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
      onclick: function (element) {
        $(element).valid(); // triggers validation on checkbox/radio click
      },
      // rules: {

      // },
      // messages: {

      // },
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
