<template>
    <div>


    <button
        @click="menuOpen = true"
        style="
            margin-top: 5px;
            margin-left: 5px;
            padding: 14px 24px;
            cursor: pointer;
            border: none;
            border-radius: 8px;
            background: #3a3a3a;
            color: white;
            font-size: 16px;
            font-weight: bold;
            transition: transform 0.2s, background 0.3s;">
        Open Shop
    </button>

        <div v-if="menuOpen" class="shop-menu">
            <div class="menu-bar">
                <div class="tabs">
                    <div :class="['tab', { active: activeTab === 'buy' }]" @click="activeTab = 'buy'">Buy</div>
                    <div :class="['tab', { active: activeTab === 'sell' }]" @click="activeTab = 'sell'">Sell</div>
                    <div class="tab" @click="menuOpen = false">Cancel</div>
                </div>
                <div class="gold-display">{{ gold }} Gold</div>
            </div>

            <div v-if="activeTab === 'buy'" class="content">
                <div v-for="(trade, index) in allTrades" :key="index" class="item-row">
                    <div class="item-name">{{ trade[7] }}</div>
                    <div class="item-seller">{{ trade[3] }} Seller</div>
                    <div class="item-quantity">{{ trade[5] }} Quantity</div>
                    <div class="item-price">{{ trade[6] }} tCore</div>
                    <button class="shop-button" @click="confirmBuy(trade)">Buy</button>
                </div>
            </div>

            <div v-if="activeTab === 'sell'" class="content">
                <div class="sell-form">
                    <select v-model="itemToSell" class="input">
                        <option v-for="resource in allResources" :key="resource.id" :value="resource">
                            {{ resource }}
                        </option>
                    </select>
                    <input type="text" v-model="priceToSell" placeholder="Price" class="input" />
                    <input type="text" v-model="quantityToSell" placeholder="Quantity" class="input" @input="validateNumber" />
                    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                    <button class="shop-button" @click="confirmSell">Sell Item</button>
                </div>
            </div>
        </div>

        <div v-if="confirmDialog" class="confirmation-popup">
            <div class="dialog-box">
                <h2>Confirm Sale</h2>
                <p>Item: {{ itemToSell }}</p>
                <p>Price: {{ priceToSell }} Gold</p>
                <p>Quantity: {{ quantityToSell }}</p>
                <div class="buttons">
                    <button @click="sellItem">Confirm</button>
                    <button @click="confirmDialog = false">Cancel</button>
                </div>
            </div>
        </div>

        <div v-if="confirmBuyDialog" class="confirmation-popup">
            <div class="dialog-box">
                <h2>Confirm Purchase</h2>
                <p>Item: {{ selectedTrade[7] }}</p>
                <p>Seller: {{ selectedTrade[3] }}</p>
                <p>Quantity: {{ selectedTrade[5] }}</p>
                <p>Price: {{ selectedTrade[6] }} tCore</p>
                <div class="buttons">
                    <button @click="buyItem">Confirm</button>
                    <button @click="confirmBuyDialog = false">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['rpgGuiInteraction','rpgCurrentPlayer'],
    name: 'NameScreenGui',
    props: {
        allTrades: Array,
        allResources: Array
    },
    data() {
        return {
            name: '',
            showDialog: false,
            menuOpen: false,
            activeTab: 'buy',
            itemToSell: '',
            priceToSell: '',
            quantityToSell: '',
            confirmDialog: false,
            confirmBuyDialog: false,
            selectedTrade: null,
            gold: 1000,
            errorMessage: ''
        };
    },
    mounted() {
   this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
     this.gold = object.gold;
   });
 },
 unmounted() {
   this.obsCurrentPlayer.unsubscribe();
 },
    methods: {
        validateNumber() {
            this.quantityToSell = this.quantityToSell.replace(/\D/g, '');
            this.errorMessage = !this.quantityToSell ? "Type a number!" : "";
        },
        changeName() {
            this.rpgGuiInteraction('NameScreenGui', 'setName', { name: this.name });
            this.showDialog = false;
        },
        confirmSell() {
            if (!this.itemToSell || !this.priceToSell || !this.quantityToSell) {
                this.errorMessage = "All fields are required!";
                return;
            }
            this.confirmDialog = true;
        },
        sellItem() {
            this.rpgGuiInteraction('NameScreenGui', 'sellItem', {
                item_name: this.itemToSell,
                item_price: this.priceToSell,
                quantity: parseInt(this.quantityToSell, 10)
            });
            this.confirmDialog = false;
            this.menuOpen = false;
        },
        confirmBuy(trade) {
            this.selectedTrade = trade;
            this.confirmBuyDialog = true;
        },
        buyItem() {
            console.log("Buying item:", this.selectedTrade);
            this.rpgGuiInteraction('NameScreenGui', 'buyItem', {
                item_name: this.selectedTrade[7],
                item_price: this.selectedTrade[6],
                quantity: this.selectedTrade[5],
                seller:this.selectedTrade[3],
                trade_id:this.selectedTrade[0]
            });
            this.confirmBuyDialog = false;
            this.menuOpen = false;
        }
    }
};
</script>


<style>
.name-screen {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dialog-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
    z-index:1000;
}
.dialog-box h2 {
    margin: 0 0 15px;
}
.dialog-box input {
    width: 90%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.buttons {
    display: flex;
    justify-content: space-between;
}
.dialog-box button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;
}
.dialog-box button:hover {
    background-color: #0056b3;
}
.shop-menu {
    position: absolute;
    top: 10;
    left: 50%;
    transform: translateX(-50%);
    width: 70%; /* Reduced width */
    height: 70%; /* Reduced width */

    background: rgba(50, 50, 50, 0.95); /* Grey background */
    z-index: 1000;
    padding: 20px;
    color: white;
    border-radius: 10px;
}

.menu-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(80, 80, 80, 0.9); /* Darker grey */
    padding: 15px;
    border-radius: 8px;
    font-size: 20px; /* Slightly larger text */
}

.tabs {
    display: flex;
}

.tab {
    padding: 12px 25px; /* Bigger buttons */
    cursor: pointer;
    font-size: 18px; /* Slightly larger text */
    font-weight: bold;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
}

.tab.active {
    background-color: rgba(100, 100, 100, 0.8); /* Highlighted grey */
}

.gold-display {
    padding: 12px 20px;
    font-size: 20px; /* Bigger gold display */
    font-weight: bold;
}

.content {
    padding: 15px;
    max-height: 350px; /* Slightly larger content box */
    overflow-y: auto;
}

.item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    font-size: 18px; /* Larger item text */
}

.item-name, .item-seller, .item-quantity, .item-price {
    flex: 1;
}

.shop-button {
    background-color: rgba(100, 100, 100, 0.9); /* Grey button */
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: white;
    padding: 10px 20px; /* Bigger buttons */
    font-size: 18px;
    cursor: pointer;
}

.shop-button:hover {
    background-color: rgba(120, 120, 120, 0.9); /* Lighter grey hover */
}

.sell-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
}
.input {
    background-color: rgba(40, 60, 100, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px;
    margin-bottom: 5px;
}
</style>
