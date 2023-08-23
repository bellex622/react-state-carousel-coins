import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
  render(
    <Card
      src={TEST_IMAGES[0].src}
      caption={TEST_IMAGES[0].caption}
      currNum={1}
      totalNum={3}
    />
  );
});

it("matches snapshot", function () {
  const { container } = render(
    <Card
      src={TEST_IMAGES[0].src}
      caption={TEST_IMAGES[0].caption}
      currNum={1}
      totalNum={3}
    />
  );
  expect(container).toMatchSnapshot();
});