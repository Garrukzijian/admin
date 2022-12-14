import React, {useState} from 'react'
import {Button, Card, Container, Form, Input, Message, Statistic} from 'semantic-ui-react'
import './App.css';
import contract from './contracts/abi.json';
import {ethers} from 'ethers';

const contractAddress = "0xa00312095A9019F1A5E12401701B21037D736290";
const abi = contract;

function App() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [numberCheck,setNumberCheck] = useState('');
    const [moneyRequire,setMoneyRequire] =useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [detail,setDetail] = useState('');
    const [donateNumber,setDonateNumber] = useState('');
    const [moneyhave,setMoneyhave] = useState('');

    const numberCheckMessageChange = ( e ) => {
        setNumberCheck( e.target.value );
    };

    const connectWalletHandler = async () => {
        const {ethereum}=window;
        if(!ethereum){
            alert("Please install Metamask!");
        }
        try {
            const accounts =await ethereum.request({method:'eth_requestAccounts'});
            console.log("Found an account!Address:",accounts[0]);
            setCurrentAccount(accounts[0]);
        }catch (err){
            console.log(err);
        }
    }

    const getProjectRefresh =async ()=>{
        try {
            const {ethereum}=window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const Contract = new ethers.Contract(contractAddress, abi, signer);
                let nftT = await Contract.test(numberCheck);
                setMoneyRequire(nftT[4].toNumber());
                setDonateNumber(nftT[6].toNumber());
                setFirstname(nftT[0]);
                setLastname(nftT[1]);
                setDetail(nftT[2]);
                setEmail(nftT[3]);
                setMoneyhave(nftT[5].toNumber());
                console.log(nftT);
            }else{
                console.log("Ethereum object does not exist!")
            }
        }catch (err) {
            console.log(err);
        }
    }

    const connectWalletButton = () => {
        return (
            <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
                Connect Wallet
            </button>
        )
    }

    const mintNftButton = () => {
        return (
            <button onClick={getProjectRefresh} className='cta-button mint-nft-button'>
                Get all project
            </button>
        )
    }
    const  transportMoney =async ()=>{
        try {
            const {ethereum}=window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const Contract = new ethers.Contract(contractAddress, abi, signer);
                let nftT = await Contract.IScompelete(numberCheck);
                console.log(nftT);
                console.log('Please wait')
                await nftT.wait();
                console.log("Successful");
            }else{
                console.log("Ethereum object does not exist!")
            }
        }catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='main-app'>
            <div>
                <Input labelPosition='right' type='text' placeholder='Amount'>
                    <input type="number" placeholder="Please enter the donate you want to check" value={numberCheck} onChange={numberCheckMessageChange}/>
                </Input>
            </div>
            <div>
                {currentAccount ? mintNftButton() : connectWalletButton()}
            </div>
            <Container>
                <br/>
                <Message info>
                    <Message.Header>One little step can help others.</Message.Header>
                    <p>Kindness helps</p>
                </Message>

                <Card.Group>
                    <Card>
                        <Card
                            image='./images/logo.jpg'
                            header='Water Found'
                            meta={email}
                            description={detail}
                            extra={firstname+"  "+lastname}
                        />
                        <Statistic color='red'>
                            <Statistic.Value>{moneyRequire}</Statistic.Value>
                            <Statistic.Label>Need</Statistic.Label>
                        </Statistic>
                        <Statistic color='yellow'>
                            <Statistic.Value>{donateNumber}</Statistic.Value>
                            <Statistic.Label>founder</Statistic.Label>
                        </Statistic>
                        <Statistic color='blue'>
                            <Statistic.Value>{moneyhave}</Statistic.Value>
                            <Statistic.Label>money already get</Statistic.Label>
                        </Statistic>
                        <Form>
                            <Button animated='fade' onClick={transportMoney}>
                                <Button.Content visible>Click to transport money</Button.Content>
                                <Button.Content hidden>earn the profit</Button.Content>
                            </Button>
                        </Form>
                    </Card>
                </Card.Group>
            </Container>
        </div>
  );
}

export default App;
