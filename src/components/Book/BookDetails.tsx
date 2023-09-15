import { NavLink, useParams } from "react-router-dom";
import { BookType } from "../../types/Book";
import UseFetch from "../../UseFetch";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const BookDetails = () => {
    const { bookid } = useParams();
    const { Books: selectedBook, isLoading } = UseFetch("/Book/" + bookid, {} as BookType);
    const [favorite, setFavorite] = useState(false);
    return (
        <>
            {!isLoading && <div className="row w-75 m-auto justify-content-center pt-5 pb-5 align-items-center">
                <div className="col-lg-5 text-center mb-4">
                    <img src={`http://wfatairreact-001-site1.ctempurl.com/api/Images/${selectedBook.image}`} alt="" className="img-flud" height={"400px"} />
                </div>
                <div className="col-lg-6 ">
                    <div className="mb-4 text-lg-start">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>{selectedBook.name}</h3>
                            <p style={{ cursor: "pointer", height: "30px", lineHeight: "40px" }} onClick={() => {
                                setFavorite(!favorite)
                            }}>
                                {
                                    favorite ? <FavoriteIcon /> :
                                        <FavoriteBorderIcon />
                                }
                            </p>
                        </div>
                        <p>By {selectedBook.author.name}</p>
                    </div>
                    <div className="mb-3 text-secondary">
                        {selectedBook.about}
                    </div>
                    <div>
                        <p className="text-success fw-semibold">Category: <span className="text-primary">{selectedBook.category.name}</span></p>
                    </div>
                    <p className="text-success fw-semibold">Author: <span className="text-primary">{selectedBook.author.name}</span></p>
                    <div className="d-flex align-items-center gap-2">
                        <p className="text-success fw-semibold">Publisher: <span className="text-primary">{selectedBook.publisher.name}</span></p>
                        <img src={`http://wfatairreact-001-site1.ctempurl.com/api/Images/${selectedBook.publisher.logo}`} width={50} alt="" />
                    </div>
                    <p className="text-success fw-semibold">Publish Year: <span className="text-primary">{selectedBook.publishYear}</span></p>
                    <div className="mt-3">
                        <button className="btn btn-primary me-3">
                            <ShoppingCartIcon style={{marginRight: "7px" , fontSize: "18px"}}/>
                            Add To Cart</button>
                        <NavLink to={"/"} className="btn btn-primary">All Books</NavLink>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default BookDetails;
