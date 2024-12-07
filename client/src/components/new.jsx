{showImages && (
    <div className="iconImagesStyle" style={{ display: 'flex', flexDirection: 'row', marginLeft: "-60px" }}>
        {eventImage.map((item, index) => (
            <img
                key={index}
                src={https://api.sofiasurgicals.com/${item.image}}
                alt="Event"
                style={{ marginRight: '10px', background: '#ffffff', cursor: 'pointer', height: "200px", width: "200px" }}
                onClick={() => handleImageClick(https://api.sofiasurgicals.com/${item.image})} // Open image in modal
            />
        ))}
        <div style={{ top: 0, right: 0, cursor: 'pointer', padding: '2px' }} onClick={() => setShowImages(false)}>
            <FaTimes size={20} style={{ color: '#000' }} />
        </div>
    </div>
)}


{modalImage && (
    <div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}
        onClick={closeModal}
    >
        <div
            style={{
                width: '500px',
                height: '500px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <img
                src={modalImage}
                alt="Modal"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <FaTimes
                size={30}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: '#000',
                    cursor: 'pointer',
                }}
                onClick={closeModal}
            />
        </div>
    </div>
)}