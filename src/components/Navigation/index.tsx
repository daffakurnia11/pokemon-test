"use client";

import Image from "next/image";
import React from "react";
import Input from "../Input";

export default function Navigation() {
  return (
    <div className="bg-blue-900 fixed top-0 left-0 right-0 z-50">
      <div className="container py-3 flex justify-between items-center">
        <div className="h-[40px]">
          <Image
            src={"/img/logo-pokeapi.png"}
            alt="Poke API Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "100%" }}
          />
        </div>
        <Input.Search />
      </div>
    </div>
  );
}
