/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);




  document.addEventListener('DOMContentLoaded', function() {
  class SkillsScroller {
    constructor() {
      this.skillsRow = document.getElementById('skillsRow');
      this.prevBtn = document.getElementById('skillsPrevBtn');
      this.nextBtn = document.getElementById('skillsNextBtn');
      this.indicatorsContainer = document.getElementById('skillsIndicators');
      
      this.currentIndex = 0;
      this.cardWidth = 200; // Card width
      this.visibleCards = this.getVisibleCards();
      this.totalCards = this.skillsRow.children.length;
      this.maxIndex = Math.max(0, this.totalCards - this.visibleCards);
      
      this.init();
    }
    
    getVisibleCards() {
      const containerWidth = this.skillsRow.parentElement.clientWidth;
      return Math.floor(containerWidth / this.cardWidth);
    }
    
    getTotalWidth() {
      return this.totalCards * this.cardWidth;
    }
    
    getContainerWidth() {
      return this.skillsRow.parentElement.clientWidth;
    }
    
    init() {
      this.calculateScrollLimits();
      this.createIndicators();
      this.updateButtons();
      this.bindEvents();
      
      // Resize handler
      window.addEventListener('resize', () => {
        this.calculateScrollLimits();
        this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
        this.updateScroll();
      });
    }
    
    calculateScrollLimits() {
      this.visibleCards = this.getVisibleCards();
      const totalWidth = this.getTotalWidth();
      const containerWidth = this.getContainerWidth();
      
      // Only allow scrolling if content is wider than container
      if (totalWidth > containerWidth) {
        this.maxIndex = Math.ceil((totalWidth - containerWidth) / this.cardWidth);
      } else {
        this.maxIndex = 0;
      }
      
      // Ensure maxIndex is not negative
      this.maxIndex = Math.max(0, this.maxIndex);
    }
    
    createIndicators() {
      this.indicatorsContainer.innerHTML = '';
      
      // Only show indicators if scrolling is needed
      if (this.maxIndex === 0) {
        return;
      }
      
      const indicatorCount = this.maxIndex + 1;
      
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement('div');
        indicator.className = `skills-indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => this.goToSlide(i));
        this.indicatorsContainer.appendChild(indicator);
      }
    }
    
    bindEvents() {
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
      
      // Touch support
      let startX = 0;
      let isDragging = false;
      
      this.skillsRow.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });
      
      this.skillsRow.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            this.next();
          } else {
            this.prev();
          }
        }
        
        isDragging = false;
      });
    }
    
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateScroll();
      }
    }
    
    next() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++;
        this.updateScroll();
      }
    }
    
    goToSlide(index) {
      this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
      this.updateScroll();
    }
    
    updateScroll() {
      const maxTranslate = -(this.getTotalWidth() - this.getContainerWidth());
      const translateX = Math.max(maxTranslate, -this.currentIndex * this.cardWidth);
      
      this.skillsRow.style.transform = `translateX(${translateX}px)`;
      
      this.updateButtons();
      this.updateIndicators();
    }
    
    updateButtons() {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.nextBtn.disabled = this.currentIndex === this.maxIndex;
    }
    
    updateIndicators() {
      const indicators = this.indicatorsContainer.children;
      Array.from(indicators).forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentIndex);
      });
    }
  }
  
  // Initialize skills scroller
  new SkillsScroller();
});



document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.skills-filters li');
            const skillItems = document.querySelectorAll('.skill-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                    this.classList.add('filter-active');
                    
                    // Filter items with smooth animation
                    skillItems.forEach(item => {
                        const shouldShow = filter === '*' || item.classList.contains(filter.substring(1));
                        
                        if (shouldShow) {
                            item.style.display = 'block';
                            // Force reflow
                            item.offsetHeight;
                            item.classList.remove('filtering-out');
                            item.classList.add('filtering-in');
                        } else {
                            item.classList.remove('filtering-in');
                            item.classList.add('filtering-out');
                            
                            // Hide after animation
                            setTimeout(() => {
                                if (!item.classList.contains('filtering-in')) {
                                    item.style.display = 'none';
                                }
                            }, 400);
                        }
                    });
                });
            });

            // Initialize with all items visible
            skillItems.forEach(item => {
                item.classList.add('filtering-in');
            });
        });







// Skills horizontal scroll functionality - Fixed Version
        const skillsContainer = document.getElementById('skillsContainer');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const skillFilters = document.querySelectorAll('.skills-filters li');
        
        let currentFilter = '*';

        // Scroll amount per click
        const scrollAmount = 200;

        // Navigation buttons
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            skillsContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
            // Update buttons after scroll animation
            setTimeout(updateNavigationButtons, 100);
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            skillsContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            // Update buttons after scroll animation
            setTimeout(updateNavigationButtons, 100);
        });

        // Update navigation buttons state
        function updateNavigationButtons() {
            const tolerance = 10; // Increase tolerance for better detection
            const isAtStart = skillsContainer.scrollLeft <= tolerance;
            const maxScrollLeft = skillsContainer.scrollWidth - skillsContainer.clientWidth;
            const isAtEnd = skillsContainer.scrollLeft >= maxScrollLeft - tolerance;
            
            // Enable/disable buttons
            prevBtn.disabled = isAtStart;
            nextBtn.disabled = isAtEnd;
            
            // Debug info
            console.log('Current scroll:', skillsContainer.scrollLeft);
            console.log('Max scroll:', maxScrollLeft);
            console.log('Is at start:', isAtStart, 'Is at end:', isAtEnd);
        }

        // Listen for scroll events with debouncing
        let scrollTimeout;
        skillsContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateNavigationButtons, 50);
        });

        // Filter functionality
        skillFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active filter
                skillFilters.forEach(f => f.classList.remove('filter-active'));
                filter.classList.add('filter-active');
                
                currentFilter = filter.getAttribute('data-filter');
                filterSkills(currentFilter);
            });
        });

        function filterSkills(filterValue) {
            const skillItems = document.querySelectorAll('.skill-item');
            
            skillItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });

            // Reset scroll position and update navigation
            skillsContainer.scrollLeft = 0;
            setTimeout(updateNavigationButtons, 200);
        }

        // Initialize navigation buttons state when page loads
        window.addEventListener('load', () => {
            setTimeout(updateNavigationButtons, 300);
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            setTimeout(updateNavigationButtons, 200);
        });

        // Touch/swipe support for mobile
        let isDown = false;
        let startX;
        let scrollLeft;

        skillsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - skillsContainer.offsetLeft;
            scrollLeft = skillsContainer.scrollLeft;
            skillsContainer.style.cursor = 'grabbing';
        });

        skillsContainer.addEventListener('mouseleave', () => {
            isDown = false;
            skillsContainer.style.cursor = 'default';
        });

        skillsContainer.addEventListener('mouseup', () => {
            isDown = false;
            skillsContainer.style.cursor = 'default';
            updateNavigationButtons();
        });

        skillsContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - skillsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            skillsContainer.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        skillsContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - skillsContainer.offsetLeft;
            scrollLeft = skillsContainer.scrollLeft;
        });

        skillsContainer.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].pageX - skillsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            skillsContainer.scrollLeft = scrollLeft - walk;
        });

        skillsContainer.addEventListener('touchend', () => {
            updateNavigationButtons();
        });

        
})();