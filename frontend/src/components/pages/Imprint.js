import React from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components/macro";

export default function Imprint (){

    const history = useHistory();

    return (
        <>
            <Layout>
                <HeaderBar>
                    <h1>Impressum</h1>
                </HeaderBar>
                <Content>
        <h2>Angaben gemäß §5 TMG</h2>
        <p>Benjamin Ranft<br />
            Hoheluftchaussee 124<br />
            20253 Hamburg</p>

        <h2>Kontakt</h2>
        <p>Telefon: +49 171 7581921<br />
            E-Mail: hello@benjaminranft.com</p>

        <h2>Haftung für Inhalte</h2>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
            forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
            Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

        <h2>Haftungs für Links</h2>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
            Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
            waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
            Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
            umgehend entfernen.</p>

        <h2>Urheberrecht</h2>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
            beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>

            </Content>
            </Layout>
        <ReturnButton onClick={handleGoBack}>
            Go back
        </ReturnButton>
</>
    )

    function handleGoBack(){
        history.goBack();
    }
}

const Content = styled.section`
grid-row: 2;
grid-column: 2;
`

const HeaderBar = styled.div`
grid-row: 1;
background-color: white;
position: fixed;
top: 0;
left: 0;
right: 0;
width: 100%;
box-shadow: var(--center-box-shadow);
align-items: center;
padding: 16px 23px;

h1{
justify-self: center;
}
`


const ReturnButton = styled.a`
padding: 12px 20px;
border-radius: 200px;
background-color: var(--accent-red);
color: white;
font-weight: bold;
position: fixed;
text-align: center;
box-shadow: var(--center-box-shadow);
left: 50px;
right: 50px;
margin: auto;
width: 60%;
bottom: 20px;
`

const Layout = styled.main`
height: 100vh;
padding: 23px;
display: grid;
grid-template-rows: 50px min-content;

h1{
font-size: var(--size-xl);
}

h2{
margin-top: 8px;
font-size: var(--size-l);
}

h3{
margin-top: 8px;
font-size: var(--size-l);
}

h4{
margin-top: 8px;
font-size: var(--size-l);
}

p{
margin-top: 2px;
font-size: var(--size-m);
}

p:last-child:after {
  content: '';
  display: block;
  height: 90px;
}
`