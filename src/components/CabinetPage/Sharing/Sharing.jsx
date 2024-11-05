import React, { useEffect, useState, useContext } from "react";
import styles from "./Sharing.module.css";
import { Modal, Button } from "rsuite";
import { AuthContext } from "../../Auth/Services/authContext";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Sharing = () => {
  const { user } = useContext(AuthContext);
  const [sharedProducts, setSharedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSharedProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/user/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch shared products");
        }
        const data = await response.json();
        setSharedProducts(data);
      } catch (error) {
        console.error("Error fetching shared products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchSharedProducts();
    }
  }, [user, BASE_URL]);

  const handleEdit = (shareId) => {
    console.log(`Edit product with ID: ${shareId}`);
  };

  const handleDelete = (shareId) => {
    setDeleteProductId(shareId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${deleteProductId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }

      setSharedProducts((prev) =>
        prev.filter((product) => product.id !== deleteProductId)
      );
      console.log("Deleted product ID:", deleteProductId);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setShowModal(false);
      setDeleteProductId(null);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (sharedProducts.length === 0) {
    return (
      <div className={styles.noProducts}>Hələ paylaşılan məhsul yoxdur.</div>
    );
  }

  return (
    <div className={styles.share}>
      {sharedProducts.map((share) => (
        <div key={share.id} className={styles.share__card}>
          <div className={styles.share__img}>
            <img
              src={
                share.otherImages && share.otherImages.length > 0
                  ? share.otherImages[0]
                  : "defaultImagePath.jpg"
              }
              alt={share.description}
            />
          </div>
          <div className={styles.share__desc}>
            <div className={styles.share__place}>
              <h6>{share.location}</h6>
            </div>
            <div className={styles.share__info}>
              <p>{share.category.name}</p>
              <p>{share.name}</p>
            </div>
            <div className={styles.share__buttons}>
              <button onClick={() => handleEdit(share.id)}>Düzenle</button>
              <button onClick={() => handleDelete(share.id)}>Sil</button>
            </div>
          </div>
        </div>
      ))}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Onayla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bu ürünü silmek istediğinize emin misiniz?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} appearance="subtle">
            İptal
          </Button>
          <Button onClick={confirmDelete} appearance="primary">
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sharing;
