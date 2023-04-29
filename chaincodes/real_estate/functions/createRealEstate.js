'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const prices = ['10000', '20000', '30000', '40000', '50000', '60000'];
const beds = ['1', '2', '3', '4', '5'];
const baths = ['1', '2'];
const acreLots = ['111', '222', '333', '444', '555'];
const fullAddresses = ['123 Main St, New York, USA', '456 Elm St, London, UK', '789 Oak St, Tokyo, Japan', '1011 Pine St, Paris, France', '1213 Maple St, Sydney, Australia'];
const streets = ['Main St', 'Elm St', 'Oak St', 'Pine St', 'Maple St'];
const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
const states = ['Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Alabama', 'Delaware', 'Florida', 'Georgia',];
const zipCodes = ['10001', '90210', '60601', '94102', '33109', '75201',];
const houseSizes = ['1212', '2323', '3434', '4545', '5656'];

/**
 * Workload module for the benchmark round.
 */
class CreateRealEstateWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++;

        const realEstateId = this.txIndex.toString();
        const ownerId = "1";
        const price = prices[Math.floor(Math.random() * prices.length)];
        const bed = beds[Math.floor(Math.random() * beds.length)];
        const bath = baths[Math.floor(Math.random() * baths.length)];
        const acreLot = acreLots[Math.floor(Math.random() * acreLots.length)];
        const fullAddress = fullAddresses[Math.floor(Math.random() * fullAddresses.length)];
        const street = streets[Math.floor(Math.random() * streets.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const zipcode = zipCodes[Math.floor(Math.random() * zipCodes.length)];
        const houseSize = houseSizes[Math.floor(Math.random() * houseSizes.length)];
        const isOpenToSell = (Math.random() < 0.5).toString();

        const args = {
            contractId: 'real_estate',
            contractVersion: 'v1',
            contractFunction: 'RealEstate_RegisterNewRealEstate',
            contractArguments: [realEstateId, ownerId, price, bed, bath, acreLot, fullAddress, street, city, state, zipcode, houseSize, isOpenToSell],
            timeout: 30
        };

        // let carNumber = 'Client' + this.workerIndex + '_CAR' + this.txIndex.toString();
        // let carColor = colors[Math.floor(Math.random() * colors.length)];
        // let carMake = makes[Math.floor(Math.random() * makes.length)];
        // let carModel = models[Math.floor(Math.random() * models.length)];
        // let carOwner = owners[Math.floor(Math.random() * owners.length)];

        // let args = {
        //     contractId: 'real_estate',
        //     contractVersion: 'v2',
        //     contractFunction: 'createCar',
        //     contractArguments: [carNumber, carMake, carModel, carColor, carOwner],
        //     timeout: 30
        // };

        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateRealEstateWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;