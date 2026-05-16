import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showTrackingPage, setShowTrackingPage] = useState(false);
  const [showFinalOrderDetails, setShowFinalOrderDetails] = useState(false);
  const [showCancelPage, setShowCancelPage] = useState(false);

  const updateQty = (title, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.title === title
            ? {
                ...i,
                qty: i.qty + delta,
              }
            : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,

    0,
  );

  const shipping = cartItems.length > 0 ? 670 : 0;

  const gst = cartItems.length > 0 ? 670 : 0;

  const grandTotal = subtotal + shipping + gst;

  const related = cartItems.slice(0, 4);

  const handlePlaceOrder = () => {
    setShowSuccessAnimation(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setShowSuccessAnimation(false);

      setShowOrderSuccess(true);
    }, 3000);
  };

  /* =========================
      SUCCESS ANIMATION
========================== */

  if (showSuccessAnimation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* GREEN CHECK */}

          <div
            className="
          w-28
          h-28
          rounded-full
          bg-green-500
          flex
          items-center
          justify-center
          animate-bounce
          "
          >
            <span className="text-white text-6xl">✓</span>
          </div>

          <h2
            className="
          mt-6
          text-4xl
          font-bold
          text-green-600
          animate-pulse
          "
          >
            Order Placed!
          </h2>
        </div>
      </div>
    );
  }

  /* =========================
      CANCEL PAGE
========================== */

  if (showCancelPage) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-3 pb-10">
        <div
          className="
        max-w-[1200px]
        mx-auto
        bg-white
        border
        border-gray-300
        rounded-2xl
        p-6
        "
        >
          {/* TITLE */}

          <h2 className="text-3xl font-bold mb-6">Cancel Item</h2>

          {cartItems.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* LEFT */}

                <div className="flex gap-5">
                  {/* IMAGE */}

                  <div
                    className="
                  w-32
                  h-32
                  bg-gray-300
                  rounded-xl
                  overflow-hidden
                  flex-shrink-0
                  "
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="
                      w-full
                      h-full
                      object-contain
                      "
                      />
                    )}
                  </div>

                  {/* DETAILS */}

                  <div>
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>

                    <div className="space-y-1 text-base">
                      <p>
                        <span className="font-bold">Size:</span> 19MM
                      </p>

                      <p>
                        <span className="font-bold">Length:</span> 20ft
                      </p>

                      <p>
                        <span className="font-bold">Code:</span> CF001
                      </p>

                      <p>
                        <span className="font-bold">Colour:</span> Green
                      </p>

                      <p>
                        <span className="font-bold">Material:</span> PVC
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT BUTTON */}

                <div className="flex items-center">
                  <button
                    className="
                  bg-red-500
                  text-white
                  px-10
                  py-3
                  rounded-lg
                  text-xl
                  font-bold
                  hover:bg-red-600
                  transition
                  cursor-pointer
                  "
                  >
                    Request Cancellation
                  </button>
                </div>
              </div>

              {/* REASON */}

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Reason"
                  className="
                w-full
                max-w-[600px]
                border
                border-gray-400
                rounded-lg
                px-5
                py-3
                text-xl
                outline-none
                "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* =========================
      FINAL ORDER DETAILS
========================== */

  if (showFinalOrderDetails) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-3 pb-10">
        <div
          className="
        max-w-[1200px]
        mx-auto
        bg-white
        border
        border-gray-300
        rounded-2xl
        p-6
        "
        >
          {/* TITLE */}

          <h2 className="text-2xl font-bold mb-2">Order Details</h2>

          <p className="text-xl mb-6">Order placed DD MM YYYY</p>

          {/* TOP SECTION */}

          {cartItems.map((item, index) => (
            <div
              key={index}
              className={`
    mb-14
    pb-10
    ${index !== cartItems.length - 1 ? "border-b border-gray-300" : ""}
  `}
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* LEFT */}

                <div className="flex gap-5">
                  {/* IMAGE */}

                  <div
                    className="
                  w-36
                  h-36
                  bg-gray-300
                  rounded-xl
                  overflow-hidden
                  flex-shrink-0
                  "
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="
                      w-full
                      h-full
                      object-contain
                      "
                      />
                    )}
                  </div>

                  {/* DETAILS */}

                  <div>
                    <h2 className="text-2xl font-bold mb-3">{item.title}</h2>

                    <div className="space-y-1 text-base">
                      <p>
                        <span className="font-bold">Size:</span> 19MM
                      </p>

                      <p>
                        <span className="font-bold">Length:</span> 20ft
                      </p>

                      <p>
                        <span className="font-bold">Code:</span> CF001
                      </p>

                      <p>
                        <span className="font-bold">Colour:</span> Green
                      </p>

                      <p>
                        <span className="font-bold">Material:</span> PVC
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT BUTTONS */}

                <div className="flex flex-col gap-4 min-w-[220px]">
                  <button
                    onClick={() => {
                      setShowFinalOrderDetails(false);

                      setShowTrackingPage(true);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="
                  bg-red-500
                  text-white
                  py-3
                  rounded-lg
                  text-xl
                  font-bold
                  hover:bg-red-600
                  transition
                  cursor-pointer
                  "
                  >
                    Track Order
                  </button>

                  <button
                    onClick={() => {
                      setShowFinalOrderDetails(false);

                      setShowCancelPage(true);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="
  border-2
  border-gray-400
  text-gray-500
  py-3
  rounded-lg
  text-lg
  font-bold
  cursor-pointer
  "
                  >
                    Cancel Order
                  </button>
                </div>
              </div>

              {/* LINE */}

              <div className="border-t border-gray-300 my-8"></div>

              {/* BOTTOM GRID */}

              <div className="grid md:grid-cols-3 gap-16 mt-2">
                {/* SHIPPING */}

                <div>
                  <h2 className="text-2xl font-bold mb-4">Shipping to</h2>

                  <div className="space-y-2 text-xl">
                    <p>Supriya</p>

                    <p>8-8-90/1, gachibowli,</p>

                    <p>Hyderabad, 534216, India</p>
                  </div>
                </div>

                {/* PAYMENT */}

                <div>
                  <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

                  <p className="text-2xl">Pay on Delivery</p>
                </div>

                {/* SUMMARY */}

                <div>
                  <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-3 text-xl">
                    <div className="flex justify-between">
                      <span>Total:</span>

                      <span>₹{subtotal.toLocaleString("en-IN")}.00</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping:</span>

                      <span>₹{shipping.toLocaleString("en-IN")}.00</span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST:</span>

                      <span>₹{gst.toLocaleString("en-IN")}.00</span>
                    </div>

                    <div className="flex justify-between font-bold">
                      <span>Order Total:</span>

                      <span>₹{grandTotal.toLocaleString("en-IN")}.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* =========================
      TRACKING PAGE
========================== */

  if (showTrackingPage) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-3 pb-10">
        <div
          className="
        max-w-[1200px]
        mx-auto
        bg-white
        border
        border-gray-300
        rounded-2xl
        p-5
        "
        >
          {/* TITLE */}

          <h2 className="text-4xl font-bold mb-6">Order Tracker</h2>

          {/* PRODUCT */}

          {cartItems.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row gap-5">
                {/* IMAGE */}

                <div
                  className="
                w-28
                h-28
                bg-gray-300
                rounded-xl
                overflow-hidden
                flex-shrink-0
                "
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                    w-full
                    h-full
                    object-contain
                    "
                    />
                  )}
                </div>

                {/* DETAILS */}

                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-bold">Size:</span> 19MM
                    </p>

                    <p>
                      <span className="font-bold">Length:</span> 20ft
                    </p>

                    <p>
                      <span className="font-bold">Code:</span> CF001
                    </p>

                    <p>
                      <span className="font-bold">Colour:</span> Green
                    </p>

                    <p>
                      <span className="font-bold">Material:</span> PVC
                    </p>
                  </div>
                </div>
              </div>

              {/* LINE */}

              <div className="border-t border-gray-300 my-8"></div>

              {/* TRACKER */}

              <div className="mt-10">
                {/* STATUS TITLE */}

                <h2
                  className="
    text-[32px]
    font-bold
    text-center
    mb-10
    "
                >
                  Ordered
                </h2>

                {/* TRACK LINE */}

                <div className="relative w-full">
                  {/* GRAY LINE */}

                  <div
                    className="
      absolute
      top-[11px]
      left-0
      w-full
      h-[3px]
      bg-gray-300
      "
                  ></div>

                  {/* BLUE ACTIVE LINE */}

                  <div
                    className="
      absolute
      top-[11px]
      left-0
      h-[3px]
      bg-blue-500
      w-[2%]
      "
                  ></div>

                  {/* STEPS */}

                  <div className="flex justify-between relative z-10">
                    {/* ORDERED */}

                    <div className="flex flex-col items-center">
                      <div
                        className="
          w-6
          h-6
          rounded-full
          bg-blue-500
          border-[3px]
          border-white
          "
                      ></div>

                      <p
                        className="
          mt-3
          text-[14px]
          font-semibold
          "
                      >
                        Ordered
                      </p>
                    </div>

                    {/* SHIPPED */}

                    <div className="flex flex-col items-center">
                      <div
                        className="
          w-6
          h-6
          rounded-full
          bg-white
          border-2
          border-gray-400
          "
                      ></div>

                      <p
                        className="
          mt-3
          text-[14px]
          text-gray-500
          "
                      >
                        Shipped
                      </p>
                    </div>

                    {/* OUT FOR DELIVERY */}

                    <div className="flex flex-col items-center">
                      <div
                        className="
          w-6
          h-6
          rounded-full
          bg-white
          border-2
          border-gray-400
          "
                      ></div>

                      <p
                        className="
          mt-3
          text-[14px]
          text-gray-500
          "
                      >
                        Out for delivery
                      </p>
                    </div>

                    {/* DELIVERED */}

                    <div className="flex flex-col items-center">
                      <div
                        className="
          w-6
          h-6
          rounded-full
          bg-white
          border-2
          border-gray-400
          "
                      ></div>

                      <p
                        className="
          mt-3
          text-[14px]
          text-gray-500
          "
                      >
                        Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM BOXES */}

              <div className="grid md:grid-cols-3 gap-4 mt-10">
                {/* DELIVERY INFO */}

                <div
                  className="
                border-2
                border-gray-300
                p-5
                rounded
                "
                >
                  <h2 className="text-2xl font-bold mb-4">Delivery Info</h2>

                  <button
                    className="
                  text-cyan-600
                  font-medium
                  "
                  >
                    ✎ Update delivery instructions
                  </button>
                </div>

                {/* ADDRESS */}

                <div
                  className="
                border-2
                border-gray-300
                p-5
                rounded
                "
                >
                  <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

                  <div className="space-y-2 text-lg">
                    <p>Sushma</p>

                    <p>7-7-90/1, Mangapati naidu nagar</p>

                    <p>Nellore</p>

                    <p>NAIDUPET, ANDHRA PRADESH 524126</p>
                  </div>
                </div>

                {/* ORDER INFO */}

                <div
                  className="
                border-2
                border-gray-300
                p-5
                rounded
                "
                >
                  <h2 className="text-2xl font-bold mb-4">Order Info</h2>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setShowTrackingPage(false);

                        setShowFinalOrderDetails(true);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="
  text-[#4b3bbd]
  font-medium
  text-left
  cursor-pointer
  "
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => {
                        setShowFinalOrderDetails(false);

                        setShowCancelPage(true);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="
  text-[#4b3bbd]
  font-medium
  text-left
  cursor-pointer
  "
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* =========================
      ORDER SUCCESS PAGE
========================== */

  if (showOrderSuccess) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-4 pb-10">
        <div
          className="
        max-w-[900px]
        mx-auto
        bg-white
        border
        border-gray-300
        rounded-2xl
        p-6
        "
        >
          {/* SUCCESS TEXT */}

          <div className="border-b border-gray-300 pb-5">
            <h2
              className="
            text-2xl
            font-bold
            text-green-600
            mb-3
            "
            >
              ✓ Order Placed , thank you!
            </h2>

            <p className="text-lg text-gray-700">
              Confirmation will be sent as message
            </p>

            <p className="text-xl mt-2">
              <span className="font-bold">Shipping to Supriya,</span> 8-8-90/1,
              gachibowli, Hyderabad, 534216, India
            </p>
          </div>

          {/* PRODUCTS */}

          <div className="mt-6 flex flex-col gap-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className="
                w-28
                h-28
                bg-gray-300
                rounded-xl
                overflow-hidden
                flex-shrink-0
                "
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                    w-full
                    h-full
                    object-contain
                    "
                    />
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-bold">Size:</span> 19MM
                    </p>

                    <p>
                      <span className="font-bold">Length:</span> 20ft
                    </p>

                    <p>
                      <span className="font-bold">Code:</span> CF001
                    </p>

                    <p>
                      <span className="font-bold">Colour:</span> Green
                    </p>

                    <p>
                      <span className="font-bold">Material:</span> PVC
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowFinalOrderDetails(true);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="
  text-[#4b3bbd]
  font-medium
  text-left
  cursor-pointer
  "
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =========================
      PLACE ORDER PAGE
========================== */

  if (showPlaceOrder) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] pt-24 px-2 sm:px-4 pb-10">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-4">
          {/* LEFT SIDE */}

          <div className="flex-1 flex flex-col gap-4">
            {/* BACK BUTTON */}

            <button
              onClick={() => setShowPlaceOrder(false)}
              className="
  mb-2
  flex
  items-center
  gap-2
  text-sm
  font-medium
  text-gray-700
  hover:text-black
  transition
  w-fit
  cursor-pointer
  "
            >
              ← Back to Payment
            </button>

            {/* ADDRESS */}

            <div
              className="
            bg-[#f8f8f8]
            border
            border-gray-300
            rounded-2xl
            p-5
            "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Delivering to Supriya
                  </h2>

                  <p className="text-lg text-gray-700">
                    8-8-90/1, gachibowli, Hyderabad, 534216, India
                  </p>

                  <button
                    className="
                  mt-3
                  text-[#4b3bbd]
                  font-medium
                  "
                  >
                    Add Delivery Instructions
                  </button>
                </div>

                <button
                  className="
                text-[#4b3bbd]
                font-medium
                "
                >
                  Change
                </button>
              </div>
            </div>

            {/* PAYMENT */}

            <div
              className="
            bg-[#f8f8f8]
            border
            border-gray-300
            rounded-2xl
            p-5
            flex
            justify-between
            items-center
            "
            >
              <h2 className="text-2xl font-bold">Pay on Delivery(Cash/UPI)</h2>

              <button
                onClick={() => setShowPlaceOrder(false)}
                className="
              text-[#4b3bbd]
              font-medium
              "
              >
                Change
              </button>
            </div>

            {/* PRODUCTS */}

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="
              bg-[#f8f8f8]
              border
              border-gray-300
              rounded-2xl
              p-5
              "
              >
                <h2 className="text-2xl font-bold mb-5">Arriving DD MM YYYY</h2>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div
                    className="
                  w-[160px]
                  h-[160px]
                  bg-gray-300
                  rounded-2xl
                  overflow-hidden
                  flex-shrink-0
                  "
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="
                      w-full
                      h-full
                      object-contain
                      "
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>

                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-400">★★★★☆</span>

                      <span className="text-sm text-blue-600 underline">
                        4 (128 Reviews)
                      </span>
                    </div>

                    <div className="space-y-1 text-base">
                      <p>
                        <span className="font-bold">Size:</span> 19MM
                      </p>

                      <p>
                        <span className="font-bold">Length:</span> 20ft
                      </p>

                      <p>
                        <span className="font-bold">Code:</span>{" "}
                        {item.code || "CF001"}
                      </p>

                      <p>
                        <span className="font-bold">Colour:</span> Green
                      </p>

                      <p>
                        <span className="font-bold">Material:</span> PVC
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}

          <div
            className="
          w-full
          xl:w-[340px]
          bg-[#f8f8f8]
          border
          border-gray-300
          rounded-2xl
          p-5
          h-fit
          "
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>

                <span>₹{subtotal.toLocaleString("en-IN")}.00</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Shipping:</span>

                <span>₹{shipping.toLocaleString("en-IN")}.00</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">GST:</span>

                <span>₹{gst.toLocaleString("en-IN")}.00</span>
              </div>

              <div
                className="
              border-t
              border-gray-300
              pt-4
              flex
              justify-between
              font-bold
              text-2xl
              "
              >
                <span>Order Total:</span>

                <span>₹{grandTotal.toLocaleString("en-IN")}.00</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="
  mt-5
  w-full
  bg-red-500
  text-white
  py-3
  rounded-full
  text-base
  font-bold
  hover:bg-red-600
  transition
  "
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
      CHECKOUT PAGE
  ========================== */

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] pt-24 px-3 sm:px-4 md:px-6 pb-10">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-4">
          {/* LEFT SIDE */}

          <div className="flex-1 flex flex-col gap-4">
            {/* BACK BUTTON */}

            <button
              onClick={() => setShowCheckout(false)}
              className="
              mb-2
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-700
              hover:text-black
              transition
              w-fit
              cursor-pointer
              "
            >
              ← Back to Cart
            </button>

            {/* ADDRESS */}

            <div
              className="
              bg-white
              border
              border-gray-300
              rounded-xl
              p-4 sm:p-5
              "
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <h2 className="text-xl font-bold mb-3">
                    Delivering to Supriya
                  </h2>

                  <p className="text-base text-gray-700 leading-relaxed">
                    8-8-90/1, gachibowli, Hyderabad, 534216, India
                  </p>

                  <button
                    className="
                    mt-3
                    text-[#4b3bbd]
                    text-sm
                    font-medium
                    hover:underline
                    "
                  >
                    Add Delivery Instructions
                  </button>
                </div>

                <button
                  className="
                  text-[#4b3bbd]
                  text-base
                  font-medium
                  hover:underline
                  self-start
                  "
                >
                  Change
                </button>
              </div>
            </div>

            {/* PAYMENT */}

            <div
              className="
              bg-white
              border
              border-gray-300
              rounded-xl
              p-4
              "
            >
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

              <div className="space-y-6">
                {/* CARD */}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="mt-1" />

                  <div>
                    <p className="font-semibold text-base">
                      Credit or debit card
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="w-12 h-7 bg-blue-700 rounded"></div>
                      <div className="w-12 h-7 bg-red-500 rounded"></div>
                      <div className="w-12 h-7 bg-blue-400 rounded"></div>
                      <div className="w-12 h-7 bg-gray-300 rounded"></div>
                      <div className="w-12 h-7 bg-red-600 rounded"></div>
                      <div className="w-12 h-7 bg-blue-900 rounded"></div>
                    </div>
                  </div>
                </label>

                {/* NET BANKING */}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="mt-1" />

                  <div>
                    <p className="font-semibold text-base mb-2">Net Banking</p>

                    <select
                      className="
                      border
                      border-gray-300
                      rounded-md
                      px-3
                      py-2
                      text-sm
                      w-full sm:w-auto
                      "
                    >
                      <option>Choose an Option</option>
                    </select>
                  </div>
                </label>

                {/* UPI */}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="mt-1" />

                  <div>
                    <p className="font-semibold text-base">
                      Scan and Pay with UPI
                    </p>

                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      You will need to Scan the QR code on the payment page to
                      complete the payment.
                    </p>
                  </div>
                </label>

                {/* OTHER UPI */}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="mt-1" />

                  <p className="font-semibold text-base">Other UPI Apps</p>
                </label>

                {/* EMI */}

                <label className="flex items-start gap-3 opacity-40">
                  <input type="radio" disabled className="mt-1" />

                  <p className="font-semibold text-base">EMI Unavailable</p>
                </label>

                {/* COD */}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="mt-1" />

                  <div>
                    <p className="font-semibold text-base">
                      Cash on Delivery/Pay on Delivery
                    </p>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      Cash, UPI and Cards accepted.
                    </p>
                  </div>
                </label>
              </div>

              {/* CHECKOUT BUTTON */}

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    setShowPlaceOrder(true);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
  bg-red-500
  text-white
  px-10 sm:px-14
  py-2.5
  rounded-full
  text-lg
  font-bold
  hover:bg-red-600
  transition
  "
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}

          <div
            className="
            w-full
            lg:w-[340px]
            bg-white
            border
            border-gray-300
            rounded-xl
            p-5
            h-fit
            "
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>

                <span>₹{subtotal.toLocaleString("en-IN")}.00</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Shipping:</span>

                <span>₹{shipping.toLocaleString("en-IN")}.00</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">GST:</span>

                <span>₹{gst.toLocaleString("en-IN")}.00</span>
              </div>

              <div
                className="
                border-t
                border-gray-300
                pt-4
                flex
                justify-between
                font-bold
                text-2xl
                "
              >
                <span>Order Total:</span>

                <span>₹{grandTotal.toLocaleString("en-IN")}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
        CART PAGE
  ========================== */

  return (
    <div className="min-h-screen bg-[#f3f3f3] pt-24 px-2 sm:px-4 pb-10">
      {/* TITLE */}

      <h1
        className="
        text-2xl
        font-bold
        text-red-500
        mb-6
        px-4 sm:px-6
        py-3
        bg-[#ffe9e9]
        "
      >
        Shopping Cart
      </h1>

      {/* MAIN CONTAINER */}

      <div className="flex flex-col xl:flex-row gap-4 max-w-[1400px] mx-auto">
        {/* LEFT SIDE */}

        <div className="flex-1 overflow-x-auto">
          {/* HEADER */}

          <div
            className="
            hidden
            md:grid
            grid-cols-4
            text-center
            font-bold
            text-lg
            text-black
            mb-4
            px-8
            min-w-[800px]
            "
          >
            <span className="text-left">Products</span>

            <span>Quantity</span>

            <span>Unit Price</span>

            <span>Total</span>
          </div>

          {/* EMPTY */}

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 py-20 text-base">
              Your cart is empty.
            </div>
          ) : (
            <div className="flex flex-col gap-4 min-w-[800px] xl:min-w-0">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="
                  bg-[#f8f8f8]
                  rounded-2xl
                  border
                  border-gray-300
                  p-4 sm:p-5
                  grid
                  grid-cols-4
                  items-center
                  text-center
                  min-h-[85px]
                  "
                >
                  {/* PRODUCT INFO */}

                  <div className="flex items-center gap-4 text-left">
                    <div
                      className="
                      w-14
                      h-14
                      bg-gray-300
                      rounded-xl
                      flex-shrink-0
                      overflow-hidden
                      "
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="
                          w-full
                          h-full
                          object-contain
                          "
                        />
                      )}
                    </div>

                    <div>
                      <p
                        className="
                        font-bold
                        text-sm
                        leading-tight
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                        text-xs
                        text-black
                        "
                      >
                        Code: {item.code || "CF001"}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQty(item.title, -1)}
                      className="
                      w-8
                      h-8
                      border
                      border-gray-400
                      bg-[#d9d9d9]
                      rounded
                      flex
                      items-center
                      justify-center
                      text-base
                      hover:bg-gray-300
                      transition
                      cursor-pointer
                      "
                    >
                      −
                    </button>

                    <span
                      className="
                      w-8
                      text-center
                      font-bold
                      text-sm
                      "
                    >
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQty(item.title, 1)}
                      className="
                      w-8
                      h-8
                      border
                      border-gray-400
                      bg-[#d9d9d9]
                      rounded
                      flex
                      items-center
                      justify-center
                      text-base
                      hover:bg-gray-300
                      transition
                      cursor-pointer
                      "
                    >
                      +
                    </button>
                  </div>

                  {/* UNIT PRICE */}

                  <span className="font-bold text-lg">₹{item.price}.00</span>

                  {/* TOTAL */}

                  <span className="font-bold text-lg">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    .00
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="w-full xl:w-[260px] flex flex-col gap-4">
          {/* ORDER SUMMARY */}

          <div
            className="
            bg-[#f8f8f8]
            rounded-2xl
            border
            border-gray-300
            p-4
            "
          >
            <h2
              className="
              text-xl
              font-bold
              mb-4
              text-center
              "
            >
              Order Summary
            </h2>

            <div
              className="
              space-y-4
              text-base
              "
            >
              <div className="flex justify-between">
                <span className="text-gray-700">Total:</span>

                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}.00
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">Shipping:</span>

                <span className="font-medium">
                  ₹{shipping.toLocaleString("en-IN")}.00
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-700">GST:</span>

                <span className="font-medium">
                  ₹{gst.toLocaleString("en-IN")}.00
                </span>
              </div>

              <div
                className="
                flex
                justify-between
                font-bold
                text-xl
                pt-4
                border-t
                border-gray-300
                "
              >
                <span>Grand Total:</span>

                <span>₹{grandTotal.toLocaleString("en-IN")}.00</span>
              </div>
            </div>

            {/* CHECKOUT */}

            <button
              onClick={() => setShowCheckout(true)}
              className="
              mt-5
              w-full
              bg-red-500
              text-white
              py-3
              rounded-full
              text-base
              font-bold
              hover:bg-red-600
              transition
              cursor-pointer
              "
            >
              Checkout
            </button>
          </div>

          {/* RELATED */}

          <div
            className="
            bg-[#f8f8f8]
            rounded-2xl
            border
            border-gray-300
            p-4
            "
          >
            <h2
              className="
              text-xl
              font-bold
              mb-4
              text-center
              "
            >
              Related
            </h2>

            <div className="flex flex-col gap-4">
              {(related.length > 0 ? related : Array(4).fill(null)).map(
                (item, i) => (
                  <div
                    key={i}
                    className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  "
                  >
                    <div
                      className="
                    w-12
                    h-12
                    bg-gray-300
                    rounded-xl
                    flex-shrink-0
                    overflow-hidden
                    "
                    >
                      {item?.image && (
                        <img
                          src={item.image}
                          alt={item?.title}
                          className="
                        w-full
                        h-full
                        object-contain
                        "
                        />
                      )}
                    </div>

                    <div>
                      <p
                        className="
                      text-xs
                      font-bold
                      leading-tight
                      "
                      >
                        {item?.title || "n-inch PVC Pipe-length"}
                      </p>

                      <p className="text-[11px] text-gray-600">
                        Code: {item?.code || "CF001"}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
