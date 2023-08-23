import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
  render(
    <Carousel photos={TEST_IMAGES} title={"Shells from far-away beaches"} />
  );
});



it("matches snapshot", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title={"Shells from far-away beaches"} />
  );
  expect(container).toMatchSnapshot();
});



it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});



it("works when you click on the left arrow", function () {
  const { container, debug } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  //expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

      // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

      // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // After moving forward and then backwards once, should be back to image 1
  // Also, should not have moved forward to image 3
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();

});


it("hides arrows at the beginning/end of carousel", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  expect(container.querySelector(".bi-arrow-left-circle")).toEqual(null);
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);

  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();


  fireEvent.click(rightArrow);
  expect(container.querySelector(".bi-arrow-right-circle")).toEqual(null);
  expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
});

// TODO: explain test flow in comments
// global constant for selector string