import { Link } from "react-router-dom";
import { HeaderContainer, HeaderTop, LogoImg, MenuItem } from "./style";
import { FaApple } from "react-icons/fa6";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaListUl } from "react-icons/fa";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTop>
        <LogoImg
          src="https://pos.nvncdn.com/4e732c-26/art/artCT/20161123_21IwG4VaWJ8BScUhd2coxILg.png"
          alt="Icon TopZone"
        />
      </HeaderTop>
      <MenuItem>
        <IoMdHome />
        <Link to="/admin" className="no-underline text-white hover:underline ml-1">
          Trang chủ
        </Link>
      </MenuItem>
      <MenuItem>
        <MdOutlineLibraryAdd />
        <Link to="/admin/addCategory" className="no-underline text-white hover:underline ml-1">
          Thêm danh mục
        </Link>
      </MenuItem>
      <MenuItem>
        <FaListUl />
        <Link to="/admin/allCategories" className="no-underline text-white hover:underline ml-1">
          Tất cả danh mục
        </Link>
      </MenuItem>
      <MenuItem>
        <MdOutlineLibraryAdd />
        <Link to="/admin/addProduct" className="no-underline text-white hover:underline ml-1">
          Thêm sản phẩm
        </Link>
      </MenuItem>
      <MenuItem>
        <FaApple />
        <Link to="/admin/allProduct" className="no-underline text-white hover:underline ml-1">
          Tất cả sản phẩm
        </Link>
      </MenuItem>
    </HeaderContainer>
  );
};

export default Header;
