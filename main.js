$(document).ready(function(){

  const sections = $('.page');
  const display = $('.maincontent');
  let inscroll = false;

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

    if (deltaY > 0) {
      scrollViewport('next');
    }
    if (deltaY < 0) {
      scrollViewport('prev');
    }

  });

});