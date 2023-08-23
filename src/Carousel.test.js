import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

const leftArrowClass = ".bi-arrow-left-circle";
const rightArrowClass = ".bi-arrow-right-circle";
const img1Class = 'img[alt="testing image 1"]';
const img2Class = 'img[alt="testing image 2"]';
const img3Class = 'img[alt="testing image 3"]';

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
    container.querySelector(img1Class)
    ).toBeInTheDocument();
    expect(
      container.querySelector(img2Class)
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(rightArrowClass);
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector(img1Class)
  ).not.toBeInTheDocument();
  expect(
    container.querySelector(img2Class)
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
    container.querySelector(img1Class)
    ).toBeInTheDocument();
  expect(
    container.querySelector(img2Class)
  ).not.toBeInTheDocument();

      // move forward in the carousel
  const rightArrow = container.querySelector(rightArrowClass);
  fireEvent.click(rightArrow);

      // move backward in the carousel
  const leftArrow = container.querySelector(leftArrowClass);
  fireEvent.click(leftArrow);

  // After moving forward and then backwards once, should be back to image 1
  // Also, should not have moved forward to image 3
  expect(
    container.querySelector(img1Class)
  ).toBeInTheDocument();
  expect(
    container.querySelector(img2Class)
  ).not.toBeInTheDocument();
  expect(
    container.querySelector(img3Class)
  ).not.toBeInTheDocument();

});


it("hides arrows at the beginning/end of carousel", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const rightArrow = container.querySelector(rightArrowClass);

  // Initially, hide left arrow and show right arrow
  expect(container.querySelector(leftArrowClass)).toEqual(null);
  expect(rightArrow).toBeInTheDocument();

  // Move forward in carousel
  fireEvent.click(rightArrow);

  const leftArrow = container.querySelector(leftArrowClass);

  // At Image 2 now, both arrows should be shown
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();


  fireEvent.click(rightArrow);

  // At final image, right arrow should be hidden. Left should be shown.
  expect(rightArrow).not.toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
});