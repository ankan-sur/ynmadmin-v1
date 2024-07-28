import React, { useEffect, useState } from 'react';
import { useUser, useAction } from "@gadgetinc/react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import Chip from "@material-ui/core/Chip";
import WbSunnyIcon from '@material-ui/icons/WbSunnyOutlined';
import NightsStayIcon from '@material-ui/icons/NightsStayOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SalesTable from '../components/salestable'
import ReactJson from 'react-json-view';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

export default function SignedInPage() {
  const navigate = useNavigate();
  const user = useUser(api);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [keys, setKeys] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [salesData, setSalesData] = useState([]);   

  const shops = [
    { value: "57144868925", label: "YNM" },
    { value: "62983274690", label: "YNE" },
  ];

	const handleNavigate = (path) => {
		navigate(path);
	};

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);

  // Clean up the scroll listener
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  useEffect(() => {
    if (user && user.keys) {
      try {
        if (Array.isArray(user.keys)) {
          setKeys(user.keys);
        }
      } catch (error) {
        console.error("Error parsing user keys", error);
        setKeys([]);
      }
    }
  }, [user, user?.keys]);

useEffect(() => {
  const fetchCollections = async () => {
        setIsLoading(true); // Begin loading
    if (!user || !user.keys || user.keys.length === 0) {
      console.log("No user or no keys available");
      return;
    }

    let fetchedCollections = [];

    for (const key of user.keys) {
      try {
        const response = await api.shopifyCollection.findMany({
          filter: {
            handle: { equals: key.handle },
            shopId: { equals: key.shopId.trim() },
          },
          select: {
            title: true,
            rules: true,
            collectionType: true,
            handle: true,
            id: true,
            shop: {
              handle: true,
              id: true
            },
            smartSales: true,
            customSales: true,
            smartProducts: {
              edges: {
                node: {
                  title: true,
                  sales: true,
                  status: true,
                  sold: true,

               }
              }
            },
            products: {
              edges: {
                node: {
                  title: true,
                  sales: true,
                  sold: true,
                  status: true,
                }
              }
            },
          }
        });

        if (Array.isArray(response) && response.length > 0) {
          setIsLoading(false); // End loading once data is fetched
          fetchedCollections.push(...response);
        }
      } catch (error) {
        setIsLoading(false); // End loading once data is fetched
        console.error("Failed to fetch collection for key:", key, error);
      }
    }

    setCollections(fetchedCollections);
  };

  fetchCollections();
}, [user, keys]); // Depend on `user` and `keys` to re-fetch when they change.

const handleChipClick = (handle) => {
  const element = document.getElementById(`collection-${handle}`);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.error("Element not found for handle:", handle);
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // For smooth scrolling
  });
};


  return user ? (
    <div className="scrollable">
      <div className="dash-greeting d-flex align-content-center">
          <h4>Welcome {user.firstName}, You are {user.account}!</h4> 
          <h5> Your Keys:</h5>

          {/* Tags/Chips */}
          {/* <div className="justify-content-around align-items-right m-2"> */}
        <div className="d-flex justify-content-center flex-wrap p-2 form-control mb-2" style={{background:'#440055'}}>
            {keys.length > 0 ? (
              keys.map((key, index) => {
                const { label, Icon } = shops.find(shop => shop.value === key.shopId) || {};
                const chipClass = label === "YNM" ? "chip ynm-chip" : "chip yne-chip";
                return (
                <Chip
                  key={index}
                  onClick={() => handleChipClick(key.handle)} // Use the click handler
                  icon={shops.find(shop => shop.value === key.shopId)?.label === "YNM" ? <WbSunnyIcon /> : <NightsStayIcon />}
                  label={`${key.handle} (${shops.find(shop => shop.value === key.shopId)?.label})`}
                  className={chipClass}
                
                />
              );
            })
          ) : <p className="no-keys-message">No keys. Click Edit to add! Choose the correct store!</p>}
          
          </div>
          <button className="s-button icon2" onClick={() => handleNavigate("/change-key")}>
            <SettingsIcon /> Account Settings
          </button>
      </div>
      <div className="full-div mt-3">
      <h4> Your Collections: </h4>
            <p>*Products with no sales are not displayed. </p>
            <p>(only first 50 products will show, but products are sorted by sales revenue and then active status. </p>
            <p>Adding a bigger table is a WIP feature!)</p>

      </div>
{
  isLoading ? (
    <div className="rounded-container w-50 dash-outer">
      <BuildCircleIcon className="spinner align-items-center glowy" alt="" style={{ color: 'white', width: '200px', height: '200px' }}/>
    </div>
  ) : collections.length > 0 ? (
    collections.map((collection, index) => (
      <div key={index} id={`collection-${collection.handle}`} className="rounded-container dash-outer">
        <h4 className="collectionHeader">{collection.title} - {collection.shop.handle} [{collection.collectionType}]</h4>
        {/* Display more collection details here */}
        <SalesTable collection={collection} />
      </div>
    ))
  ) : (
    <div className="rounded-container w-50 dash-outer">
      <p>No collections found for your keys.</p>
    </div>
  )
}
           {showTopBtn && (
      <button onClick={scrollToTop} className="back-to-top-btn">
        ↑       </button>
    )} 
      </div>
    
  ) : null;
}
