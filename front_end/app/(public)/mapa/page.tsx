export default function Map() {
  return (
    <div className="w-screen  bg-[--new] block pr-5 h-[calc(92vh-1rem)]">
      <div className="relative w-full bg-[--new]">
        <iframe
          className="absolute top-0 left-0 w-[calc(100%)] h-[calc(90vh)] bg-[--new]"
          title="DashBoardAmbiciente"
          width="1140"
          height="541.25"
          src="https://app.powerbi.com/view?r=eyJrIjoiOTkwZmQ5Y2UtNmMxMy00ZWU2LTkwYTktYmIyZGJhODZlNjdkIiwidCI6IjU5ZDRmMjQ5LTA1MjAtNDZjZi1iNmIyLTg3M2Q1ZGE1NDNmZSJ9"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
