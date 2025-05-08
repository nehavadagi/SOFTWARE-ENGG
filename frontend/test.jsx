// Sample test with React Testing Library
import { render } from "@testing-library/react";
test('renders search input', () => {
  const { getByPlaceholderText } = render(<Home />);
  expect(getByPlaceholderText("Search images")).toBeInTheDocument();
});
