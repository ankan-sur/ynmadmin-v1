import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAction, useUser } from "@gadgetinc/react";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { api } from "../api";

const ProductForm = () => {
    const user = useUser(api);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [tray, setTray] = useState([]);
    const [distributionType, setDistributionType] = useState("");
    const [artists, setArtists] = useState([]);
    const [{ data, error, fetching }, createProduct] = useAction(api.submitProducts.create);

    const shops = [
        { value: "YNM", label: "YNM" },
        { value: "YNE", label: "YNE" },
    ];

    const availableArtists = [
        { value: "artist1", label: "Artist 1" },
        { value: "artist2", label: "Artist 2" },
        { value: "artist3", label: "Artist 3" },
    ];

    const handleAddToTray = (product) => {
        setTray([...tray, product]);
    };

    const handleDeleteFromTray = (index) => {
        setTray(tray.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            console.log("Submitting products:", tray);
            await Promise.all(tray.map(product => createProduct(product)));
            setMessage('Thank you! Your products have been submitted.');
            setTray([]);
        } catch (error) {
            setMessage('Error submitting products. Please try again.');
            console.error("Submission error:", error);
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target.closest('form');
        const formData = new FormData(form);
        const product = Object.fromEntries(formData.entries());
        product.description = { markdown: product.description };
        product.submittedBy = { _link: user.id };
        product.distributionType = distributionType;
        if (distributionType === "Collab" || distributionType === "Bundle") {
            product.participatingArtists = artists;
        }
        console.log("Adding product to tray:", product);
        handleAddToTray(product);
        form.reset();
    };

    return (
        <div className="rounded-container vw-70 dash-outer product-submission-form">
                <h1 className="form-title mb-4 text-center">Submit Products</h1>
                {message && <p>{message}</p>}
                
                <form>
                    <div>
                        <label>Title</label> <br/>
                        <input
                            type="text"
                            name="title"
                            required
                        />
                    </div>
                    <div>
                        <label>Description</label>  <br/>
                        <textarea
                            name="description"
                            required
                        />
                    </div>
                    <div>
                        <label>Measurements</label> <br/>
                        <input
                            type="text"
                            name="measurements"
                            required
                        />
                    </div>
                    <div>
                        <label>Collection Tag</label> <br/>
                        <input
                            type="text"
                            name="collectionTag"
                            required
                        />
                    </div>
                    <div>
                        <label>Product Tags (separate by commas) </label> <br/>
                        <input
                            type="text"
                            name="productTags"
                            required
                        />
                    </div>
                    <div>
                        <label>Store</label> <br/>
                        <select
                            name="store"
                            required
                        >
                            <option value="">Pick 1</option>
                            {shops.map(shop => (
                                <option key={shop.value} value={shop.value}>{shop.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Distribution Type</label> <br/>
                        <div>
                            <input
                                type="radio"
                                name="distributionType"
                                value="Collab"
                                onChange={(e) => setDistributionType(e.target.value)}
                            />
                            <label>Collab</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="distributionType"
                                value="Original"
                                onChange={(e) => setDistributionType(e.target.value)}
                            />
                            <label>Original</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="distributionType"
                                value="Commercial"
                                onChange={(e) => setDistributionType(e.target.value)}
                            />
                            <label>Commercial</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="distributionType"
                                value="Bundle"
                                onChange={(e) => setDistributionType(e.target.value)}
                            />
                            <label>Bundle</label>
                        </div>
                    </div>
                    {(distributionType === "Collab" || distributionType === "Bundle") && (
                        <div>
                            <label>Participating Artists</label> <br/>
                            <select
                                name="participatingArtists"
                                multiple
                                value={artists}
                                onChange={(e) => setArtists(Array.from(e.target.selectedOptions, option => option.value))}
                            >
                                {availableArtists.map(artist => (
                                    <option key={artist.value} value={artist.value}>{artist.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button 
                        className="btn btn-dark border m-1" 
                        type="button"
                        onClick={handleAddProduct}
                    >
                        <CheckCircleIcon/> Add
                    </button>
                </form>
                
                <div className="tray">
                    {tray.length > 0 ? (
                        tray.map((product, index) => (
                            <Chip
                                key={index}
                                className={product.store === "YNM" ? "chip ynm-chip" : "chip yne-chip"}
                                label={`${product.title} - $${product.cost}`}
                                onDelete={() => handleDeleteFromTray(index)}
                            />
                        ))
                    ) : (
                        <p>Add Products and they will appear here :) <br/> Once in the tray, you can submit them</p>
                    )}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <button
                        type="button"
                        onClick={() => setTray([])}
                        className="btn btn-dark border m-1"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={tray.length === 0}
                        className="btn btn-dark border m-1"
                    >
                        Submit Products
                    </button>
                </div>
            
        </div>
    );
};

export default ProductForm;
