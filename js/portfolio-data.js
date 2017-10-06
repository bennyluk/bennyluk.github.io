var _projectsList = [
  "store-manager",
  "file-manager",
  "mobile-editor",
  "alignment-guide",
  "fancy-shape",
  /*
  "whats-new",
  "quick-cart",
  */
  "anchor",
  "social-link-bar",
  "chat-bubble"
];

var _projects = {
  "store-manager": {
    name: "Store Manager",
    image: "images/store-manager/poster.jpg",
    heroImg: "images/store-manager/hero.jpg",
    content: [
      {
        menu: {
          "sm-dashboard": "Dashboard",
          "sm-elements": "Elements",
          "sm-checkout": "Checkout"
        },
        type: "text",
        title: "Add a store to your website today",
        description: "With Store Manager integrated to Website.com Editor, you can easily create your own eCommerce site. Start selling your products now !"
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/RnQ-TtoaiCo',
        bg: "images/store-manager/video-bg.jpg"
      },
      {
        id: "sm-dashboard",
        type: "text",
        title: "Dashboard",
        description: "Manage your products from Name, SKU, Price, Images, and even options. After add the products to a custom collection for better organization. Supports International Shipping and Tax. Remember to also set up your payments !"
      },
      {
        type: "image",
        bg: "images/store-manager/dashboard.jpg",
        images: [
          {
            src: "images/store-manager/dashboard/product_list.jpg",
            title: "Manage all Store Products"
          },
          {
            src: "images/store-manager/dashboard/edit_product.jpg",
            title: "Edit Store Product",
            description: "Update your Product Name, Price, Images, and Options."
          },
          {
            src: "images/store-manager/dashboard/collections.jpg",
            title: "Manage Store Collections"
          },
          {
            src: "images/store-manager/dashboard/edit_collection.jpg",
            title: "Edit Store Collection",
            description: "Organize your products by adding it a Collection"
          },
          {
            src: "images/store-manager/dashboard/orders.jpg",
            title: "View Orders"
          },
          {
            src: "images/store-manager/dashboard/edit_order.jpg",
            title: "View Order Status"
          },
          {
            src: "images/store-manager/dashboard/regions.jpg",
            title: "Regions List"
          },
          {
            src: "images/store-manager/dashboard/edit_region.jpg",
            title: "Edit Region",
            description: "Set up your shipping, in-store pickup, and tax"
          },
          {
            src: "images/store-manager/dashboard/payments.jpg",
            title: "Payments",
            description: "Set up payment methods (Paypal, Stripe, Offline)."
          },
          {
            src: "images/store-manager/dashboard/store_info.jpg",
            title: "Store Info",
            description: "Enter your Store Information."
          },
          {
            src: "images/store-manager/dashboard/store_settings.jpg",
            title: "Store Settings"
          },
        ]
      },
      {
        id: "sm-elements",
        type: "text",
        title: "Elements",
        description: "Customize your store website with our easy to use store elements."
      },
      {
        type: "grid",
        src: "images/store-manager/master_product.jpg",
        title: "Master Product",
        description: "Edit the Layout and Design of your Product Page.",
        align: "text"
      },
      {
        type: "grid",
        src: "images/store-manager/master_cart.jpg",
        title: "Master Cart",
        description: "Change the styling and looks of your Cart Page.",
        align: "image"
      },
      {
        type: "grid",
        src: "images/store-manager/cart_icon.jpg",
        title: "Cart Icon",
        description: "Choose from the 4 different designs of the cart icon. Item Counter also included !",
        align: "text"
      },
      {
        id: "sm-checkout",
        type: "text",
        title: "Checkout",
        description: "No Extra Hassle Needed. We will set up the whole checkout process for you. From the shipping address, we will display all the accepted shipping options and payment methods. Secure and Mobile Responsive, sit back and let us do all the checkout process."
      },
      {
        type: "image",
        bg: "images/store-manager/checkout.jpg",
        images: [
          {
            src: "images/store-manager/checkout/address.jpg",
            title: ""
          },
          {
            src: "images/store-manager/checkout/shipping.jpg",
            title: ""
          },
          {
            src: "images/store-manager/checkout/payment.jpg",
            title: ""
          },
          {
            src: "images/store-manager/checkout/invoice.jpg",
            title: ""
          }
        ]
      }
    ]
  },
  "file-manager": {
    name: "File Manager",
    heroImg: "images/store-manager/hero.png",
    image: "images/file-manager/poster.jpg",
    content: [
      {
        menu: {
          "fm-dashboard": "Dashboard",
          "fm-preview": "Preview",
          "fm-utility": "Utility"
        },
        type: "text",
        title: "Managing Made Easy",
        description: "With File Manager integrated to website.com Editor, you, you can easily manage your files and add them you to your website."
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/7nu9yQbb8ss',
        bg: "images/file-manager/video-bg.jpg"
      },
      {
        id: "fm-dashboard",
        type: "text",
        title: "Dashboard",
        description: "Manage all your files from images, audio, videos, and documents all in one place with the newly designed File Manager."
      },
      {
        type: "image",
        bg: "images/file-manager/dashboard.jpg",
        images: [
          {
            src: "images/file-manager/dashboard/grid_view.jpg",
            title: "Test 1",
            description: "Description of Test 1 Goes Here"
          },
          {
            src: "images/file-manager/dashboard/list_view.jpg",
            title: "Test 2",
            description: "Description of Test 2 Goes Here"
          },
          {
            src: "images/file-manager/dashboard/preview.jpg",
            title: "Test 2",
            description: "Description of Test 2 Goes Here"
          },
          {
            src: "images/file-manager/dashboard/drag_drop_upload.jpg",
            title: "Test 2",
            description: "Description of Test 2 Goes Here"
          },
          {
            src: "images/file-manager/dashboard/preview.jpg",
            title: "Test 2",
            description: "Description of Test 2 Goes Here"
          }
        ]
      },
      {
        id: "fm-preview",
        type: "text",
        title: "Preview",
        description: "Quick Preview your images, audio, videos powered by the HTML 5. Metadata are also shown when possible."
      },
      {
        id: "fm-utility",
        type: "grid",
        src: "images/file-manager/search.jpg",
        title: "Search",
        description: "Quickly find your files with the search tool. Forgot where you placed it ? Just click on the “Open in Folder” to immediately go to the folder.",
        align: "text"
      },
      {
        type: "grid",
        src: "images/file-manager/crop_image.jpg",
        title: "Crop",
        description: "Image not focusing on where you want it to ? Use the quick crop tool and select which section you want the image to crop.",
        align: "image"
      },
      {
        type: "grid",
        src: "images/file-manager/rotate_image.jpg",
        title: "Rotate",
        description: "Use the rotate tool to rotate the image, so you can have that nice landscape picture you always wanted.",
        align: "text"
      }
    ]
  },
  "alignment-guide": {
    name: "Alignment Guide",
    heroImg: "images/store-manager/hero.png",
    image: "images/alignment-guide/poster.jpg",
    content: [
      {
        type: "text",
        title: "Just a bit more to the left",
        description: "Keep your website in ship-shape with the alignment guide! When dragging an element, the guide will help you align the edges of your item to other web elements, or keep your elements centered."
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/meYUJfIXsBE',
        bg: "images/alignment-guide/video-bg.jpg"
      }
    ]
  },
  "mobile-editor": {
    name: "Mobile Editor",
    heroImg: "images/store-manager/hero.png",
    image: "images/mobile-editor/poster.jpg",
    content: [
      {
        menu: {
          "me-editor": "Editor",
          "me-mobile-menu": "Mobile Menu",
          "me-smart-layout": "Smart Layout"
        },
        type: "text",
        title: "Make your website mobile friendly !",
        description: "Convert your website into a mobile-ready version with NO coding experience needed."
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/AA_Fb6QIrh0',
        bg: "images/mobile-editor/video-bg.jpg"
      },
      {
        id: "me-editor",
        type: "grid",
        src: "images/mobile-editor/drag-and-drop.jpg",
        title: "Drag and Drop",
        description: "Our drag-and-drop interface lets users place the web content anywhere they want on a web page.",
        align: "text"
      },
      {
        id: "me-mobile-menu",
        type: "grid",
        src: "images/mobile-editor/mobile-menu.jpg",
        title: "Mobile Menu",
        description: "A Mobile Menu Icon will automatically be created and be in sync with your desktop menu. Just change the styling and you are ready to go.",
        align: "image"
      },
      {
        id: "me-smart-layout",
        type: "text",
        title: "Smart Layout",
        description: "Smart Layout will scan the page elements and predict what’s the best way to style your new mobile friend web page. It will automatically reposition and readjust your elements to fit the mobile guidelines. Even more, further adjustments are easily adjustable by the drag or resize handles if needed."
      }
    ]
  },
  "whats-new": {
    name: "Whats New",
    heroImg: "images/store-manager/hero.png",
    image: "images/store-manager/poster.jpg",
    content: [
      {
        menu: {
          "me-editor": "Editor",
          "me-mobile-menu": "Mobile Menu",
          "me-smart-layout": "Smart Layout"
        },
        type: "text",
        title: "Make your website mobile friendly !",
        description: "Convert your website into a mobile-ready version with NO coding experience needed."
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/AA_Fb6QIrh0',
        bg: "images/store-manager/video-bg.png"
      },
      {
        id: "me-editor",
        type: "grid",
        src: "images/store-manager/video-bg.png",
        title: "Drag and Drop",
        description: "Our drag-and-drop interface lets users place the web content anywhere they want on a web page.",
        align: "text"
      },
      {
        id: "me-mobile-menu",
        type: "grid",
        src: "images/store-manager/video-bg.png",
        title: "Mobile Menu",
        description: "A Mobile Menu Icon will automatically be created and be in sync with your desktop menu. Just change the styling and you are ready to go.",
        align: "image"
      },
      {
        id: "me-smart-layout",
        type: "text",
        title: "Smart Layout",
        description: "Smart Layout will scan the page elements and predict what’s the best way to style your new mobile friend web page. It will automatically reposition and readjust your elements to fit the mobile guidelines. Even more, further adjustments are easily adjustable by the drag or resize handles if needed."
      },
      {
        type: "image",
        bg: "images/store-manager/video-bg.png"
      }
    ]
  },
  "quick-cart": {
    name: "Quick Cart",
    heroImg: "images/store-manager/hero.png",
    image: "images/store-manager/poster.jpg",
    content: [
      {
        menu: {
          "me-editor": "Editor",
          "me-mobile-menu": "Mobile Menu",
          "me-smart-layout": "Smart Layout"
        },
        type: "text",
        title: "Make your website mobile friendly !",
        description: "Convert your website into a mobile-ready version with NO coding experience needed."
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/AA_Fb6QIrh0',
        bg: "images/store-manager/video-bg.png"
      },
      {
        id: "me-editor",
        type: "grid",
        src: "images/store-manager/video-bg.png",
        title: "Drag and Drop",
        description: "Our drag-and-drop interface lets users place the web content anywhere they want on a web page.",
        align: "text"
      },
      {
        id: "me-mobile-menu",
        type: "grid",
        src: "images/store-manager/video-bg.png",
        title: "Mobile Menu",
        description: "A Mobile Menu Icon will automatically be created and be in sync with your desktop menu. Just change the styling and you are ready to go.",
        align: "image"
      },
      {
        id: "me-smart-layout",
        type: "text",
        title: "Smart Layout",
        description: "Smart Layout will scan the page elements and predict what’s the best way to style your new mobile friend web page. It will automatically reposition and readjust your elements to fit the mobile guidelines. Even more, further adjustments are easily adjustable by the drag or resize handles if needed."
      },
      {
        type: "image",
        bg: "images/store-manager/video-bg.png"
      }
    ]
  },
  "fancy-shape": {
    name: "Fancy Shape",
    heroImg: "images/store-manager/hero.png",
    image: "images/fancy-shape/poster.jpg",
    content: [
      {
        type: "text",
        title: "Spice up your page with Fancy Shapes",
        description: "Icons are a great way to throw together a quick logo, add a bit of fun to your design, or draw attention to an area of your website!"
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/nPJZ5x0r6nI',
        bg: "images/fancy-shape/video-bg.jpg"
      },
      {
        type: "grid",
        src: "images/fancy-shape/svg.jpg",
        title: "Vector SVG",
        description: "With the power of Vector SVG, you can resize your icon to any size without losing any resolution ! When finished, style it up with any color !",
        align: "text"
      },
      {
        id: "me-mobile-menu",
        type: "grid",
        src: "images/fancy-shape/animation.jpg",
        title: "Animation",
        description: "Make your icon more flashy with Animations.",
        align: "image"
      }
    ]
  },
  "anchor": {
    name: "Anchor",
    heroImg: "images/store-manager/hero.png",
    image: "images/anchor/poster.jpg",
    content: [
      {
        type: "text",
        title: "Shortcuts for you website.",
        description: "Anchor tools let you link to a specific place within a web page, or between pages. Anchor tools let you make long, \"one pager\" websites, \"back to top\" buttons, and more!"
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/iqOIt88xqZI',
        bg: "images/anchor/video-bg.jpg"
      }
    ]
  },
  "social-link-bar": {
    name: "Social Link Bar",
    heroImg: "images/store-manager/hero.png",
    image: "images/anchor/poster.jpg",
    content: [
      {
        type: "text",
        title: "Shortcuts for you website.",
        description: "Anchor tools let you link to a specific place within a web page, or between pages. Anchor tools let you make long, \"one pager\" websites, \"back to top\" buttons, and more!"
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/iqOIt88xqZI',
        bg: "images/anchor/video-bg.jpg"
      }
    ]
  },
  "chat-bubble": {
    name: "Chat Bubble",
    heroImg: "images/store-manager/hero.png",
    image: "images/chat-bubble/poster.jpg",
    content: [
      {
        type: "text",
        title: "Say What ?!?",
        description: "Show dialogue on your web pages as though someone is speaking. This handy tool is also great for showing testimonials in a fun way, or making an announcement. "
      },
      {
        type: "video",
        src: 'https://www.youtube.com/embed/u9rp7Pq1JPA',
        bg: "images/anchor/video-bg.jpg"
      },
      {
        type: "grid",
        src: "images/chat-bubble/arrow_shape.jpg",
        title: "Arrow Shape / Position",
        description: "Customize the Arrow Shape. Adjust the Position wherever you want it !",
        align: "text"
      },
      {
        type: "grid",
        src: "images/chat-bubble/custom_text.jpg",
        title: "Custom Text",
        description: "Create your chat bubble dialog with our easy Text Editor.",
        align: "image"
      }
    ]
  }
};
