import { room } from '@rpgjs/client'
import { RpgReactContext, useEventPropagator } from '@rpgjs/client/react'
import { useContext, useState,useEffect } from 'react'

export default function Test({ gold }) {
    const { rpgCurrentPlayer } = useContext(RpgReactContext)
    console.log(rpgCurrentPlayer.gold)
    const propagate = useEventPropagator();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('buy');
    const [itemToSell, setItemToSell] = useState('');
    const [priceToSell, setPriceToSell] = useState('');
    useEffect(() => {
       const subscription = rpgCurrentPlayer.subscribe(({ object }) => {
       console.log(object)

       });

       return () => {
         subscription.unsubscribe();
       };
     }, []);
    const menuStyles = {
        container: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: 1000,
            display: menuOpen ? 'block' : 'none'
        },
        menuBar: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(59, 89, 152, 0.8)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '10px 0',
        },
        tabsContainer: {
            display: 'flex',
        },
        tab: {
            padding: '10px 30px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRight: '1px solid rgba(255, 255, 255, 0.3)',
        },
        activeTab: {
            backgroundColor: 'rgba(80, 110, 170, 0.8)',
        },
        goldDisplay: {
            padding: '10px 20px',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        contentArea: {
            backgroundColor: 'rgba(59, 89, 152, 0.8)',
            padding: '15px',
            color: 'white',
            display: activeTab === 'cancel' ? 'none' : 'block',
            maxHeight: '300px',
            overflowY: 'auto',
        },
        itemRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        },
        itemName: {
            flex: 1,
        },
        itemPrice: {
            marginRight: '15px',
            color: 'gold',
        },
        button: {
            backgroundColor: 'rgba(80, 110, 170, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            color: 'white',
            padding: '5px 15px',
            cursor: 'pointer',
            fontSize: '14px',
        },
        sellForm: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '10px',
        },
        input: {
            backgroundColor: 'rgba(40, 60, 100, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '8px',
            marginBottom: '5px',
        }
    };

    const handleTabClick = (tab) => {
        if (tab === 'cancel') {
            setMenuOpen(false);
            return;
        }
        setActiveTab(tab);
    };

    const buyItems = [
        { name: 'Sword', price: 100 },
        { name: 'Shield', price: 150 },
        { name: 'Potion', price: 50 },
        { name: 'Magic Scroll', price: 200 }
    ];

    return (
        <div ref={propagate}>
            <button onClick={() => setMenuOpen(true)} style={{ padding: '10px', cursor: 'pointer' }}>Open Shop</button>
            <div style={menuStyles.container}>
                <div style={menuStyles.menuBar}>
                    <div style={menuStyles.tabsContainer}>
                        <div
                            style={{
                                ...menuStyles.tab,
                                ...(activeTab === 'buy' ? menuStyles.activeTab : {})
                            }}
                            onClick={() => handleTabClick('buy')}
                        >
                            Buy
                        </div>
                        <div
                            style={{
                                ...menuStyles.tab,
                                ...(activeTab === 'sell' ? menuStyles.activeTab : {})
                            }}
                            onClick={() => handleTabClick('sell')}
                        >
                            Sell
                        </div>
                        <div
                            style={menuStyles.tab}
                            onClick={() => handleTabClick('cancel')}
                        >
                            Cancel
                        </div>
                    </div>
                    <div style={menuStyles.goldDisplay}>
                        {gold} Gold
                    </div>
                </div>

                {activeTab === 'buy' && (
                    <div style={menuStyles.contentArea}>
                        {buyItems.map((item, index) => (
                            <div key={index} style={menuStyles.itemRow}>
                                <div style={menuStyles.itemName}>{item.name}</div>
                                <div style={menuStyles.itemPrice}>{item.price} Gold</div>
                                <button style={menuStyles.button}>Buy</button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'sell' && (
                    <div style={menuStyles.contentArea}>
                        <div style={menuStyles.sellForm}>
                            <input
                                type="text"
                                placeholder="Item to sell"
                                value={itemToSell}
                                onChange={(e) => setItemToSell(e.target.value)}
                                style={menuStyles.input}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={priceToSell}
                                onChange={(e) => setPriceToSell(e.target.value)}
                                style={menuStyles.input}
                            />
                            <button style={{...menuStyles.button, alignSelf: 'flex-end'}}>
                                Sell Item
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
