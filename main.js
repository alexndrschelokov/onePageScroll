$(document).ready(function(){

  const sections = $('.page');
  const display = $('.maincontent');
  let inscroll = false;

  //for mobile
  const md = new MobileDetect(window.navigator.userAgent);
  const isMobile = md.mobile();

  const countPosition = (index) => {
    return -index * 100 + '%';
  };

  const setActiveClass = (index) => {
    sections
      .eq(index)
      .addClass('active')
      .siblings()
      .removeClass('active');
  };

  const unblockInscroll = () => {
    const duration = 1000;
    const inertion = 300;

    setTimeout(() => {
      inscroll = false;
    }, duration + inertion);
  };

  const performTransition = (sectionEq) => {
    if (inscroll) return;
    inscroll = true;

    const position = countPosition(sectionEq);

    display.css({
      transform: `translateY(${position})`
    });

    setActiveClass(sectionEq)
    unblockInscroll();

  };

  const scrollViewport = (direction) => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === 'next' && nextSection.length) {
      performTransition(nextSection.index());
    }

    if (direction === 'prev' && prevSection.length) {
      performTransition(prevSection.index());
    }

  };

  $(window).on('wheel', function(e){
    
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? 'next' : 'prev';

    scrollViewport(direction);

  });

  if (isMobile) {

    //дергания
    // $('.wrapper').on('touchmove', e => e.preventDefault());
    const wrapper = document.querySelector('.wrapper');
    wrapper.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, {passive: false})

    $(window).swipe( {
      swipe: function(event, direction) {
        const scrollDirection = direction === 'up' ? 'next' : 'prev';

        scrollViewport(scrollDirection);
      }
    });

  };

});