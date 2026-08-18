const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".testimonial-dot");
const prevButton = document.querySelector(".testimonial-prev");
const nextButton = document.querySelector(".testimonial-next");

let currentSlide = 0;
let autoRotate;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function previousSlide() {
  const previousIndex =
    (currentSlide - 1 + slides.length) % slides.length;

  showSlide(previousIndex);
}

function startAutoRotate() {
  autoRotate = setInterval(nextSlide, 6500);
}

function resetAutoRotate() {
  clearInterval(autoRotate);
  startAutoRotate();
}

nextButton.addEventListener("click", () => {
  nextSlide();
  resetAutoRotate();
});

prevButton.addEventListener("click", () => {
  previousSlide();
  resetAutoRotate();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetAutoRotate();
  });
});

startAutoRotate();

const quoteForm = document.querySelector(".quote-form");
const formSuccess = document.querySelector("#form-success");
const quoteSubmitButton = document.querySelector(".quote-submit");

quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalButtonText = quoteSubmitButton.textContent;

    quoteSubmitButton.textContent = "Sending...";
    quoteSubmitButton.disabled = true;

    try {
        const formData = new FormData(quoteForm);

        const response = await fetch(quoteForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            quoteForm.style.display = "none";
            formSuccess.classList.add("show");

            quoteForm.reset();
        } else {
            throw new Error("Submission failed");
        }
    } catch (error) {
        quoteSubmitButton.textContent = "Please Try Again";
        quoteSubmitButton.disabled = false;

        setTimeout(() => {
            quoteSubmitButton.textContent = originalButtonText;
        }, 2500);
    }
});