import React, { useState } from "react";
import Style from "./style.module.css";
import {
  AiOutlineQuestionCircle,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlinePauseCircle,
  AiOutlinePlus,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import QrCodeCard from "../cardQr/QRCode";
import { useGetQRBulkQuery, useUpdateQRByIdMutation, useGetShopListQuery } from "../../service";
import {Autocomplete, TextField} from '@mui/material'

// VscSettings
export default function Index() {
  const { data, isLoading, isSuccess } = useGetQRBulkQuery();
  const [setWebLink] = useUpdateQRByIdMutation();
  const {data:shopList} = useGetShopListQuery();
  // console.log(shopList);
  const [main, setMain] = useState([])
  const  [len, setLen] = useState(0)
  const [search, setSearch] = React.useState();


 const handleSearch = (e)=>{
  // console.log(e.target.value)

  var searched = data?.filter((element)=>{
    // console.log(element.QrIdName)
    return ( element.QrIdName.toLowerCase().includes(e.target.value.toLowerCase()) || 
        element.Link?.toLowerCase().includes(e.target.value.toLowerCase())
    
    )
  })

  // console.log(searched)
  setMain(searched)
  setLen(searched.length)
 }

 
 React.useEffect(()=>{
    if(data){
      setMain(data)
      setLen(data.length)
    }
 },[data])

 async function getWebUrl(e, iD){
    // console.log(e, iD)
    var body = {
      id: iD,
      Link:e
    }
   var res = await setWebLink(body)
  //  console.log(res)
 }



  return (
    <>
      <div className={Style.navbar}>
        <div className={Style.box}>
          <span className={Style.logo}>
            <img src="./img/logo.png" width="100px" alt="logo" />
          </span>
          <span className={Style.menu}>
            <AiOutlineMenuUnfold />
          </span>
          <span className={Style.last}>
            <span className={Style.questionMark}>
              <AiOutlineBell />
            </span>
            <span className={Style.questionMark}>
              <AiOutlineQuestionCircle />
            </span>
            <span className={Style.user}>
              <span className={Style.userIcon}>
                <AiOutlineUser />
              </span>
              <span className={Style.Account}> Account</span>
            </span>
          </span>
        </div>
        <hr className={Style.hr} />
      </div>
      <div className={Style.mainBody}>
        <div className={Style.offCanvas}>
          <div className={Style.search}>
            {/* seacrch */}

            <div className={Style.searchbarBox}>
              <p>
              <input
                type="text"
                className={Style.searchBar}
                name="searchbar"
                id="mySearchbar"
                placeholder="Search QR Codes..."
                value={search}
                onChange={handleSearch}
              />
              

   
              
              
              
              </p>
              {/* <button >
		<span >
			<AiOutlineSearch />
		</span>
	</button> */}
            </div>
          </div>
          <div className={Style.item}>
            <div>
              <span className={Style.topHeading}>My QR CODES</span>
            </div>
            <div>
              <span className={Style.All}>
                <span className={Style.offMenuIcon}>
                  <GiHamburgerMenu />
                </span>{" "}
                <span>All</span>
              </span>
            </div>
            <div>
              <span className={Style.All}>
                <span className={Style.offMenuIcon}>
                  <TbActivityHeartbeat />
                </span>
                <span>Active</span>
              </span>
            </div>
            <div>
              <span className={Style.All}>
                <span className={Style.offMenuIcon}>
                  <AiOutlinePauseCircle />
                </span>
                <span>Pause</span>
              </span>
            </div>

            <div className={Style.bottomHeading}>
              <span>MY FOLDER</span>
            </div>
          </div>
        </div>

        <div className={Style.rightComponent}>
          <div className={Style.rightHeading}>
            <span className={Style.rightHeadingIcon}>
              {" "}
              <GiHamburgerMenu />
            </span>
            <span className={Style.rightHeadingTitle}>All QR Codes ({len}) </span>
            <span className={Style.rightHeadingIcon}>
              <VscSettings />
            </span>

            <span className={Style.rightHeadingCreate}>
              {" "}
              <span>
                <AiOutlinePlus className={Style.rightHeadingCreateIcon} />
              </span>{" "}
              <span className={Style.rightHeadingCreateText}>
                CREATE QR CODE
              </span>
            </span>
          </div>        

          {main?.map((item) => {
            return <>
          <div className={Style.QrCodeCards}>
            <QrCodeCard item={item} getWebUrl={getWebUrl}/>
          </div>
            </>
          })}
        </div>
      </div>
    </>
  );
}
