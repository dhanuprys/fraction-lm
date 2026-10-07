import { Outlet } from "react-router-dom";
import { TipPopup } from "@/components/ui/TipPopup";

export default function StudentQuizLayout() {
  return (
    <>
      <div className="min-h-screen h-screen overflow-hidden flex bg-white font-sans text-slate-800">
        <main className="flex-1 w-full h-full relative flex">
          <Outlet />
        </main>
      </div>
      <TipPopup />
    </>
  );
}
