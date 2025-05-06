Webflow.push(function () {
  // ✅ intl-tel-input setup
  const input = document.querySelector('[data-input="phone"]');
  const dialCode = document.querySelector(".dialCode");

  let iti; // scope accessible for validator method

  if (input) {
    iti = window.intlTelInput(input, {
      initialCountry: "auto",
      strictMode: true,
      geoIpLookup: (callback) => {
        fetch("https://ipapi.co/json")
          .then((res) => res.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback("in"));
      },
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js",
    });

    input.addEventListener("input", () => {
      if (dialCode) {
        dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
      }
    });

    input.addEventListener("countrychange", () => {
      if (dialCode) {
        dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
      }
    });

    // ✅ Custom validator method for intl-tel-input
    $.validator.addMethod(
      "validIntlPhone",
      function (value, element) {
        return iti && iti.isValidNumber();
      },
      "Please enter a valid phone number"
    );
  }

  // ✅ Custom validator for checkbox group (attribute-based)
  $.validator.addMethod("minchecked", function (value, element, param) {
    return $("input[name='" + element.name + "']:checked").length >= param;
  });

  // ✅ Setup form validation
  $('[data-validate-form="true"]').each(function () {
    const $form = $(this);

    $form.validate({
      errorPlacement: function (error, element) {
        error.appendTo(element.closest("[data-errorplace='true']"));
      },
      onkeyup: function (element) {
        $(element).valid();
      },
      onclick: function (element) {
        $(element).valid();
      },
    });
  });

  // ✅ Page URL auto-fill
  const pageUrl = document.querySelector('[fs-hacks-element="show-page-url"]');
  const pageUrlInput = document.querySelector(
    '[fs-hacks-element="page-url-input"]'
  );

  if (pageUrl && pageUrlInput) {
    const url = location.href;
    pageUrlInput.value = url;
    pageUrl.innerText = url;
  }

  // ✅ Reload button support
  $('[data-reload="true"]').on("click", function () {
    location.reload();
  });
});
