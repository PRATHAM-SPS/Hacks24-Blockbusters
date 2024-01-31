import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

function GenerateInvoice() {
    const element = document.querySelector("#invoiceCapture");
  
    html2canvas(element, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 792]
      });
  
      const imgWidth = 612;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let position = 0;
      let pageHeight = pdf.internal.pageSize.getHeight();
  
      while (position < imgHeight) {
        const sliceHeight = Math.min(imgHeight - position, pageHeight);
        pdf.addImage(
          imgData,
          'PNG',
          0,
          -position,
          imgWidth,
          imgHeight,
          null,
          'SLOW', // 'SLOW' option enables rendering the image with clipping
          'MEDIUM',
          0,
          true
        );
        position += sliceHeight;
  
        if (position < imgHeight) {
          pdf.addPage();
        }
      }
  
      pdf.save('invoice-001.pdf');
    });
  }
  
  
  

class InvoiceModal extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return(
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <h4 className="fw-bold my-2">{this.props.info.billFrom||'John Uberbacher'}</h4>
                <h6 className="fw-bold text-secondary mb-1">
                  Invoice #: {this.props.info.invoiceNumber||''}
                </h6>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                <h5 className="fw-bold text-secondary"> {this.props.currency} {this.props.total}</h5>
              </div>
            </div>
            <div className="p-4">
              <Row className="mb-4">
                <Col md={4}>
                  <div className="fw-bold">Transferred From:</div>
                  <div>{this.props.info.billFrom||''}</div>
                  <div>{this.props.info.billFromAddress||''}</div>
                  <div>{this.props.info.billFromEmail||''}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold">Transferred to:</div>
                  <div>{this.props.info.billTo||''}</div>
                  <div>{this.props.info.billToAddress||''}</div>
                  <div>{this.props.info.billToEmail||''}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold mt-2">Date Of Issue:</div>
                  <div>{this.props.info.dateOfIssue||''}</div>
                </Col>
              </Row>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th style={{fontSize: '18px'}}>Deed of Transfer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    THIS DEED OF TRANSFER made at Mumbai, this …1.. Day of ……2…. 2017 BETWEEN MR/Mrs. ………3……..age .4.  years, an Indian Inhabitant, residing at ……5…….Flat no. / village / city  pin code………6…. PanNo…7….. Adara Id ….8…  .hereinafter called "THE TRANSFEROR" (which expression shall unless it be repugnant to the context or meaning thereof mean and include his heirs, executors and administrators) of the ONE PART: 
                  </tr>
                  <tr>
                    <b style={{alignContent: 'center'}} className='m-10'>AND</b>
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    MR/Mrs. ………9……..age .10. years an Indian Inhabitant, residing at …….11…..Flat no / village / city  pin code ……6……. PanNo…7….. Adara Id ….8…   hereinafter called "THE TRANSFEREE" (which expression shall unless it be repugnant to the context or meaning thereof mean and include her heirs, executors, administrators and assigns) of the OTHER  PART 
                  </tr>
                  <hr></hr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    WHEREAS by an Agreement dated……12.., registered in the office of Sub-Registrar of Assurances.  under Serial No. ……14… for the consideration and on the terms and conditions contained therein, this flat has purchased from the DEVELOPERS / Builder /Owner……15……..the Residential Premises bearing Flat No. …16….area …..17…Sq. Ft. Carpet /Built up/Super Built up area or thereabouts, located on the ..18… Floor &…19….Exclusive …20…..Car parking Space bearing No…21..  of the Building known as …22…..name  …23……. Co-operative Housing Society Ltd.;situated at Village …24..… Mumbai City / Mumbai Suburban (hereinafter for the sake of brevity referred to as "the said Flat"). 
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}} className="mt-2">
                    AND WHEREAS incidental to the holding of the said Premises, the said ……25………..are enjoying membership rights of the ………23………Co-operative Housing Society Ltd.; the Society formed and registered under the Maharashtra Co-operative Societies Act, 1960, bearing Registration No. ……26…….dated ……27…..(hereinafter for the sake of brevity referred to as "the said Society") covered by Five fully paid up shares of Rs…28… each of the said Society bearing distinctive Nos. …289to …29... (both inclusive) incorporated in the Share Certificate No. …30…hereinafter for the sake of brevity referred to as "the said Shares" of the said Society. AND WHEREAS as on today the TRANSFEROR is the absolute Owner of the said Premises and enjoying membership rights of the said Society.
                  </tr>
                  <hr></hr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    AND WHEREAS on coming to know the intention of the TRANSFEROR regarding sale of the said Premises, the TRANSFEREE approached the TRANSFEROR and negotiated for sale and transfer of the said Premises and the said shares of the Society in her favor and the TRANSFEROR made following representations to the TRANSFEREE in respect of the said Premises i.e.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    * There are no suits, litigation, civil or criminal or any other proceedings pending as against the <b>TRANSFEROR</b> in respect of the said Premises.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    * There are no attachments or prohibitory orders against the said Premises and the said Premises is not subject matter of any lispendance or attachments either before or after judgments.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    * The <b>TRANSFEROR</b> has not received any notice either from Income Tax authorities or any other statutory body or authorities regarding the acquisition or requisition of the said Premises.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    * There are no encumbrances created against the said Premises and the title of the TRANSFEROR to the said Premises are clear, marketable and free from all other encumbrances 
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    * Except <b>TRANSFEROR</b>, no other person or authority have got right, title or interest of whatsoever nature against the said Premises.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    * The <b>TRANSFEROR</b> has not been adjudicated insolvent nor he has committed any act of insolvency nor is there any order of any Court or Authority restraining him or creating any inability from entering in to this agreement.
                  </tr>
                  <hr></hr>
                  <tr>
                    Relying upon the aforesaid representations made by the TRANSFEROR, the <b>TRANSFEREE</b> agreed to purchase the said Premises on ownership basis and incidental thereto transfer of the said Shares of the said Society for the consideration of  Rs…31…..(Rupees………32…..) and on the terms and conditions appearing hereinafter. 
                  </tr>
                  <hr></hr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    1.     The recitals contained herein shall form the integral part of this Agreement as if the same are set out and incorporated herein.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    2.	The TRANSFEROR declares that he is the absolute owner of the said Premises and enjoying membership rights of the said Society and he is holding the said Premises quietly without any claim or obstruction from any other person. The TRANSFEROR further declares that notwithstanding any act, deed, matter or thing whatsoever by the TRANSFEROR or any person or persons lawfully or equitably claiming by, from , through, under or in trust for him made, done, committed or omitted or knowingly suffered to the contrary, the TRANSFEROR has good right, full power and absolute authority to convey, transfer and assure the said Premises hereby agreed to be transferred, conveyed and assigned in favour of the TRANSFEREE as aforesaid and he has not done, committed or omitted any act, deed, matter or thing whereby the ownership, possession or occupation and enjoyment of the said Premises may be rendered void or voidable.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    3.	On receiving full consideration as mentioned herein above, the TRANSFEROR shall hand over to the TRANSFEREE, the title documents in his custody, in respect of the said Premises. 
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    4.  If any person claims any right, title or interest in the said Premises through the TRANSFEROR and thereby the TRANSFEREE is put to any losses, expenses, then in such event the TRANSFEROR agrees and undertakes to indemnify and keep indemnified the TRANSFEREE against all claims, actions, demands and proceedings arising in respect of the said Premises.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    5.	In the event of any dispute  pertaining to any matter relating to the transaction or any matter arising out of the interpretation of this Agreement shall be referred to sole arbitrator appointed by both the parties hereto and thus, disputes and differences shall be resolved in accordance with the provisions of Arbitration & Conciliation Act, 1996.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    6.	The TRANSFEROR declares that the said Premises is free from all encumbrances and the same is not mortgaged or in any manner charged for payment of any money to any person or Financial Institutions. The TRANSFEROR further declares that he has not entered into any agreement for transfer, sale or leave and licence or let out in respect of the said Premises with any other person or persons.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    7.  At present the said Premises is in lawful possession of the TRANSFEROR. Without reserving any right, the TRANSFEROR shall hand over peaceful physical possession of the said Premises to the TRANSFEREE on receiving the full consideration as agreed. The TRANSFEROR do hereby covenant with the TRANSFEREE that after taking possession of the said Premises, the TRANSFEREE shall enjoy quietly and peacefully and occupy the said Premises without any hindrance, denial, demands, interruption or eviction by the TRANSFEROR or any person lawfully or equitably claiming through, under or in trust for the TRANSFEROR.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    8.	All the taxes, electricity charges, maintenance charges and other outgoings in respect of the said Premises shall be paid by the TRANSFEREE from the date of taking over possession and till then, the TRANSFEROR shall pay all the taxes, electricity charges, maintenance charges and outgoings to the respective Authorities.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    9.	The TRANSFEREE confirms that before execution of this Agreement, she has inspected the said Premises and satisfied herself regarding area, quality of construction and condition thereof. In future, the TRANSFEREE shall not raise any objection or dispute regarding the said issues. If further renovation or repairs are required, the same shall be done by the TRANSFEREE.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    10.	The TRANSFEREE shall abide herself by the rules and regulations of the said Society and pay the taxes and all other outgoing in respect of the said Premises, as and when the same become due for payment and keep the TRANSFEROR indemnified in respect thereof till the time the TRANSFEREE is admitted as the member of the said Society in respect of the said Premises.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    10.	The TRANSFEREE shall abide herself by the rules and regulations of the said Society and pay the taxes and all other outgoing in respect of the said Premises, as and when the same become due for payment and keep the TRANSFEROR indemnified in respect thereof till the time the TRANSFEREE is admitted as the member of the said Society in respect of the said Premises.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    11.	The TRANSFEROR and the TRANSFEREE will execute necessary documents as and when required for giving proper effect to what is agreed herein and to transfer the said shares and the said Premises to the TRANSFEREE in the books of the said Society and other appropriate authorities.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    12.	The TRANSFEROR shall obtain the consent or no objection from the said Society for transferring the said Premises in favour of the TRANSFEREE.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    13.	The premium / Transfer fee of the said Society in respect of the transfer of the said shares and the said Premises will be borne and paid by the TRANSFEROR and the TRANSFEREE, equally. 
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    14.	 Electricity/ Water meters/Mahanagar Gas, Sinking Fund and all the amount standing to the credit of the TRANSFEROR in the books of the said Society in respect of the said Premises shall be transferred in the name of the TRANSFEREE on payment of full consideration as agreed.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px'}}>
                    15.	The Stamp Duty and Registration charges of this Agreement shall be borne and paid by the TRANSFEREE / TRANSFEROR alone. The Parties here to undertake to comply with all the formalities required for completing the registration of this Agreement in respect of the said Premises in the record of the Sub-Registrar of assurances.
                  </tr>
                  <tr style={{width: '100px', fontSize: '14px', marginBottom: '10px'}}>
                    16.	The TRANSFEROR shall from time to time and at all reasonable times do and execute or cause to be done and executed all such acts, deeds and things whatsoever for more perfectly securing the right, title and interest of the TRANSFEROR in the said Premises agreed to be sold and transferred unto and to the use of the TRANSFEREE.
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                  <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <hr className="mt-4 mb-3"/>
      </div>
    )
  }
}

export default InvoiceModal;
