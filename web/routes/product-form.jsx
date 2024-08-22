import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAction, useUser } from "@gadgetinc/react";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { api } from "../api";

const ProductForm = () => {
    const user = useUser(api);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [tray, setTray] = useState([]);
    const [distribution, setDistribution] = useState("");
    const [{ data, error, fetching }, createProduct] = useAction(api.submitProducts.create);

    const shops = [
        { value: "YNM", label: "YNM" },
        { value: "YNE", label: "YNE" },
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
        product.distribution = distribution;
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
                        <label htmlFor="title">Title</label> <br/>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>  <br/>
                        <textarea
                            name="description"
                            id="description"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="measurements">Measurements</label> <br/>
                        <input
                            type="text"
                            name="measurements"
                            id="measurements"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="collectionTag">Collection Tag</label> <br/>
                        <input
                            type="text"
                            name="collectionTag"
                            id="collectionTag"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="productTags">Product Tags (separate by commas) </label> <br/>
                        <input
                            type="text"
                            name="productTags"
                            id="productTags"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="store">Store</label> <br/>
                        <select
                            name="store"
                            id="store"
                            required
                        >
                            <option value="">Pick 1</option>
                            {shops.map(shop => (
                                <option key={shop.value} value={shop.value}>{shop.label}</option>
                            ))}
                        </select>
                    </div>
                    <label>Distribution Type</label> <br/>
                    <div className="tray w-25 m-auto">
                        <div>
                            <input
                                type="radio"
                                name="distribution"
                                value="Collab"
                                id="collab"
                                className="w-auto h-25"
                                onChange={(e) => setDistribution(e.target.value)}
                            />
                            <label htmlFor="collab">Collab</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="distribution"
                                value="Original"
                                id="original"
                                className="w-auto h-25"
                                onChange={(e) => setDistribution(e.target.value)}
                            />
                            <label htmlFor="original">Original</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="distribution"
                                value="Commercial"
                                id="commercial"
                                className="w-auto h-25"
                                onChange={(e) => setDistribution(e.target.value)}
                            />
                            <label htmlFor="commercial">Commercial</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="distribution"
                                value="Bundle"
                                id="bundle"
                                className="w-auto h-25"
                                onChange={(e) => setDistribution(e.target.value)}
                            />
                            <label htmlFor="bundle">Bundle</label>
                        </div>
                    </div>
                    {(distribution === "Collab" || distribution === "Bundle") && (
                        <div>
                            <label htmlFor="participating">Participating Artists</label> <br/>
                            <label>(Separate by commas)</label> <br/>
                            <input
                                type="text"
                                name="participating"
                                id="participating"
                                required
                            />
                        </div>
                    )}
                    <button 
                        className="btn btn-dark border m-1" 
                        type="button"
                        onClick={handleAddProduct}
                    >
                    <AddCircleIcon/>  Add
                    </button>
                </form>
                
                <div className="tray">
                    {tray.length > 0 ? (
                        tray.map((product, index) => (
                            <Chip
                                key={index}
                                className={product.store === "YNM" ? "chip ynm-chip" : "chip yne-chip"}
                                label={`${product.title} - ${product.distribution}`}
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
                        <CheckCircleIcon/> Submit Products
                    </button>
                </div>
            
        </div>
    );
};

export default ProductForm;
