$(document).ready(function() {
    console.log('Initializing preview controls...');

    // Initialize device buttons
    function initDeviceButtons() {
        $('.device-btn').on('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            $('.device-btn').removeClass('active');
            // Add active class to clicked button
            $(this).addClass('active');
            
            // Get the size from data attribute
            const size = $(this).data('size');
            setFrameSize(size, $(this).attr('title'));
        });
    }

    // Set frame size based on selection
    function setFrameSize(size, device) {
        const frame = $('#livePreviewFrame');
        
        // Remove all size classes
        frame.removeClass('frame-desktop frame-laptop frame-tablet frame-phone-horizontal frame-phone');
        
        // Add appropriate class based on device
        switch(device) {
            case 'Desktop':
                frame.addClass('frame-desktop');
                break;
            case 'Laptop':
                frame.addClass('frame-laptop');
                break;
            case 'Tablet':
                frame.addClass('frame-tablet');
                break;
            case 'Phone Horizontal':
                frame.addClass('frame-phone-horizontal');
                break;
            case 'Phone':
                frame.addClass('frame-phone');
                break;
            default:
                frame.addClass('frame-desktop');
        }
        
        console.log(`Set frame to ${device} mode (${size})`);
    }

    // Set default to Desktop
    function setDefaultView() {
        $('.device-btn[data-size="100%"]').addClass('active');
        $('#livePreviewFrame').addClass('frame-desktop');
    }

    // Handle iframe load
    $('#livePreviewFrame').on('load', function() {
        console.log('Iframe content loaded');
        // Ensure proper sizing after content loads
        $(this).css('visibility', 'visible');
    });

    // Initialize everything
    initDeviceButtons();
    setDefaultView();

    // Handle window resize
    $(window).on('resize', function() {
        // Re-apply current size on resize
        const activeDevice = $('.device-btn.active').attr('title');
        const activeSize = $('.device-btn.active').data('size');
        setFrameSize(activeSize, activeDevice);
    });

    // Add confirmation for close button
    $('.close-btn').on('click', function(e) {
        if (!confirm('Are you sure you want to leave the preview?')) {
            e.preventDefault();
        }
    });

    console.log('Preview controls initialized successfully');
});

// Fallback for jQuery issues
if (typeof jQuery === 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Using native JavaScript fallback');
        
        const deviceButtons = document.querySelectorAll('.device-btn');
        const frame = document.getElementById('livePreviewFrame');
        
        deviceButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                deviceButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Set frame size
                const device = this.getAttribute('title');
                const size = this.getAttribute('data-size');
                
                // Remove all size classes
                frame.classList.remove('frame-desktop', 'frame-laptop', 'frame-tablet', 'frame-phone-horizontal', 'frame-phone');
                
                // Add appropriate class
                switch(device) {
                    case 'Desktop':
                        frame.classList.add('frame-desktop');
                        break;
                    case 'Laptop':
                        frame.classList.add('frame-laptop');
                        break;
                    case 'Tablet':
                        frame.classList.add('frame-tablet');
                        break;
                    case 'Phone Horizontal':
                        frame.classList.add('frame-phone-horizontal');
                        break;
                    case 'Phone':
                        frame.classList.add('frame-phone');
                        break;
                }
                
                console.log(`Native JS: Set frame to ${device} mode`);
            });
        });
        
        // Set default view
        document.querySelector('.device-btn[data-size="100%"]').classList.add('active');
        frame.classList.add('frame-desktop');
    });
}