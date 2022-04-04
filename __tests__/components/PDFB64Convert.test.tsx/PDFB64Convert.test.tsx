import { render } from "@testing-library/react";
import FileB64Convert from "components/FileB64Convert/FileB64Convert";
import "@testing-library/jest-dom";

describe("FieldSetUploadPdf Component", () => {
  test("Uma URL deve retornar desse componente", async () => {
    const { getByTestId } = render(<FileB64Convert />);
    const pdfInput = getByTestId("upload-file-content");
    expect(pdfInput).toBeInTheDocument();
  });
});
