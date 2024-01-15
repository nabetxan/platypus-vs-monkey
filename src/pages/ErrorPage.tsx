import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = function () {
  const error = useRouteError();
  let errorMessage = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.error(error);
  return (
    <>
      <div className="pt-8 text-6xl text-gray-50 text-center">Error Page</div>
      <div>{errorMessage}</div>
    </>
  );
};

export default ErrorPage;
