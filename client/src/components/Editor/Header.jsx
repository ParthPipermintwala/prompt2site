import React from "react";
import {motion as Motion} from "motion/react";
import { Link } from "react-router-dom";

export default function Header({title = "Editor"}) {
  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
     <span className="font-semibold truncate">{title}</span>
    </div>
  );
}
