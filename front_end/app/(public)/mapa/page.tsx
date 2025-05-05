export default function Map() {
  return (
    <div className="w-screen  bg-[#eef3e1] block pr-5 mt-[calc(8vh+1rem)] h-[calc(92vh-1rem)]">
      <div className="relative w-full bg-[#eef3e1]">
        <iframe
          className="absolute top-0 left-0 w-[calc(100%)] h-[calc(90vh)] bg-[#eef3e1]"
          title="DashBoardAmbiciente"
          width="1140"
          height="541.25"
          src="https://app.powerbi.com/view?r=eyJrIjoiNWU3YzUwZjctNWYyOS00MTUwLTlhZGUtYTYzMTdjYmNmZjg0IiwidCI6IjU5ZDRmMjQ5LTA1MjAtNDZjZi1iNmIyLTg3M2Q1ZGE1NDNmZSJ9"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
