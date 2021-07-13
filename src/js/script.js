$(document).ready(function () {
  //carousel  
  $('.carousel__inner').slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  //tabs
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //modal
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  })

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  })

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  })

  //form validation

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: 'required',
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите свое имя",
        phone: "Пожалуйста, введите свой номер телефон",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  //masking phone input

  $('input[name=phone]').mask('+7 (999) 999-99-99');

  //server

  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function () {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();
      $('form').trigger('reset');
    });
    return false;
  })

  //smooth scroll

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut()
    }
  });

  $(function(){
    $("a[href^=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
  });
  
  //animation

  new WOW().init();
})