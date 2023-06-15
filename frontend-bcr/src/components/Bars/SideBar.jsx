import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sidebarChangeSelected,
  sidebarChangeSelectedSubmenuItem,
} from "../../redux/sliders/sidebar/sidebarSlider";
import sidebarStyles from "../../assets/styles/sidebar/sidebar.module.css";
import { colors_produ } from "../../constants/colors";
const SideBar = () => {
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBarSelection.value);
  const user_info = useSelector((state) => state.userData.value);
  return (
    <nav className="w-full font-bold text-xs 2xl:text-sm text-slate-600">
      <ul className="w-full flex flex-col gap-3 ">
        {Object.keys(sideBar).map((itemSideBar, i) => {
          return (
            <li
              key={i}
              onClick={() =>
                dispatch(sidebarChangeSelected({ selectedItem: itemSideBar }))
              }
              className={`flex flex-col`}
            >
              <section
                className={`${sidebarStyles.item
                  } rounded-r-2xl flex flex-row gap-3 items-center py-1
                h-[30px]
                  cursor-pointer ${sideBar[`${itemSideBar}`].state
                    ? sidebarStyles.activeBox
                    : ""
                  }`}
              >
                <div
                  className={`w-[3px] ${sideBar[`${itemSideBar}`].state
                    ? " h-[30px]  rounded-2xl bg-[#00000033]"
                    : "invisible"
                    }
            `}
                />
                <img
                  className={`filter object-contain w-5 h-5 ${sidebarStyles.activeBefore}
                  
                  ${sideBar[`${itemSideBar}`].state
                      ? "invert"
                      : "invert-0"
                    }
                  `}
                  src={sideBar[`${itemSideBar}`].icon}
                  alt="users_icons"
                />
                <div
                  className={`${sideBar[`${itemSideBar}`].state
                    ? `text-slate-100 ${sidebarStyles.activeText}`
                    : ""
                    }`}
                >
                  <span className="hidden md:block">
                    {sideBar[`${itemSideBar}`].display_name}
                  </span>
                </div>
              </section>
              <section>
                {sideBar[`${itemSideBar}`].subMenu && (
                  <ul
                    className={`${sideBar[`${itemSideBar}`].state ? "flex" : "hidden"
                      } flex-col gap-1 duration-300 ease-in-out`}
                  >
                    {Object.keys(sideBar[`${itemSideBar}`].subMenu).map(
                      (item, i) => {
                        const flag_user =
                          user_info.tipo_usuario === "administrador" ||
                          user_info.tipo_usuario === "ingresador";
                        const flag_module = item === "manage_cliente_fantasma";
                        if (flag_module) {
                          if (flag_user)
                            return (
                              <li
                                onClick={() =>
                                  dispatch(
                                    sidebarChangeSelectedSubmenuItem({
                                      selectedItem: itemSideBar,
                                      selectedSubitem: item,
                                    })
                                  )
                                }
                                key={i}
                                className={`${sidebarStyles.itemSubmenu
                                  } py-1 rounded-r-2xl cursor-pointer flex flex-row gap-2 mx-3 px-0 items-center ${sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                    .state
                                    ? sidebarStyles.activeBoxSubItem
                                    : ""
                                  }`}
                              >
                                <div
                                  className={`w-[3px] ${sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                    .state
                                    ? " h-[20px]"
                                    : "invisible"
                                    }`}
                                />
                                <img
                                  className={`filter object-contain w-5 h-5 ${sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                    .state
                                    ? "invert"
                                    : "invert-0"
                                    }`}
                                  src={
                                    sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                      .icon
                                  }
                                  alt="users_icons"
                                />
                                <div>
                                  <span className="hidden md:block">
                                    {
                                      sideBar[`${itemSideBar}`].subMenu[
                                        `${item}`
                                      ].display_name
                                    }
                                  </span>
                                </div>
                              </li>
                            );
                        } else {
                          return (
                            <li
                              onClick={() =>
                                dispatch(
                                  sidebarChangeSelectedSubmenuItem({
                                    selectedItem: itemSideBar,
                                    selectedSubitem: item,
                                  })
                                )
                              }
                              key={i}
                              className={`${sidebarStyles.itemSubmenu
                                } py-1 rounded-r-2xl cursor-pointer flex flex-row gap-2 mx-3 px-0 items-center ${sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                  .state
                                  ? sidebarStyles.activeBoxSubItem
                                  : ""
                                }`}
                            >
                              <div
                                className={`w-[3px] ${sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                  .state
                                  ? " h-[20px]  rounded-2xl bg-[#00000033]"
                                  : "invisible"
                                  }`}
                              />
                              <img
                                className={`filter object-contain w-5 h-5 ${sidebarStyles.activeBefore}
                                ${sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                    .state
                                    ? "invert"
                                    : "invert-0"
                                  }
                                `}
                                src={
                                  sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                    .icon
                                }
                                alt="users_icons"
                              />
                              <div>
                                <span className="hidden md:block">
                                  {
                                    sideBar[`${itemSideBar}`].subMenu[`${item}`]
                                      .display_name
                                  }
                                </span>
                              </div>
                            </li>
                          );
                        }
                      }
                    )}
                  </ul>
                )}
              </section>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
