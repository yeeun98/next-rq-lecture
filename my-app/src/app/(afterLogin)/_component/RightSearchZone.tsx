"use client";

import style from "./rightSearchZone.module.css";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import { useRef } from "react";
import cx from "classnames";

export default function RightSearchZone() {
  const pathname = usePathname();

  // radio 버튼 ref
  const allRef = useRef<HTMLInputElement>(null);
  const followRef = useRef<HTMLInputElement>(null);

  const [selectedFilter, setSelectedFilter] = useState<"all" | "follow">("all");

  const onClickAll = () => {
    allRef.current?.click();
    setSelectedFilter("all");
  };

  const onClickFollow = () => {
    followRef.current?.click();
    setSelectedFilter("follow");
  };

  if (pathname === "/explore") return null;

  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>

            <div className={style.filterItem} onClick={onClickAll}>
              <div>모든 사용자</div>
              <div
                className={cx(style.customRadio, {
                  [style.selected]: selectedFilter === "all",
                })}
              ></div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                hidden
                ref={allRef}
              />
            </div>

            <div className={style.filterItem} onClick={onClickFollow}>
              <div>내가 팔로우하는 사람들</div>
              <div
                className={cx(style.customRadio, {
                  [style.selected]: selectedFilter === "follow",
                })}
              ></div>
              <input type="radio" name="pf" value="on" hidden ref={followRef} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}
