// apexloan/src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="hero" style={{ backgroundImage: "url('/img1.jpg')" }}>
        <h1>Apex Loan</h1>
        <h2>Get Instant Loans in South Africa</h2>
        <p>
          Apex Loan provides a seamless platform for South Africans to access instant loans ranging from R5,000 to R500,000. Apply now and get quick access to funds!
        </p>
        <div className="button-group">
          <button onClick={handleApplyNow}>Apply Now</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>

      <section className="commitment">
        <h2>Our Commitment to You</h2>
        <p>
          Apex Loan is dedicated to providing accessible and convenient financial solutions to South Africans. Our mission is to empower individuals by offering loans without the burden of collateral, ensuring that everyone has the opportunity to meet their financial needs. We value integrity, customer-centricity, transparency, and innovation in all our operations. Our experienced team, led by industry experts, is committed to guiding you through a seamless application process, making it easier than ever to secure the funds you need. Trust us to be your reliable partner in achieving your financial goals.
        </p>
      </section>

      <section className="loan-options">
        <h2>Get Instant Access to Funds with Apex Loan Options</h2>
        <ul>
          <li>Loan Amounts: R5,000 to R500,000</li>
          <li>No Collateral: Secure a loan without collateral</li>
          <li>Quick Approval: Fast and efficient application process</li>
        </ul>
      </section>

      <section className="loan-details">
        <h2>Loan Interest &amp; Period</h2>
        <div className="loan-detail">
          <h3>Small Loans (R5,000 - R20,000)</h3>
          <p>
            Ideal for covering smaller, immediate expenses. Quick approval and disbursal process. Flexible repayment terms to suit your budget. The interest rate is 0.10% per day, for the period of 90 days.
          </p>
        </div>
        <div className="loan-detail">
          <h3>Medium Loans (R21,000 - R150,000)</h3>
          <p>
            Suitable for larger projects or consolidating debt. Competitive interest rates. Manageable monthly payments. The interest rate is 0.12% per day for the period of 150 days.
          </p>
        </div>
        <div className="loan-detail">
          <h3>Large Loans (R151,000 - R500,000)</h3>
          <p>
            Perfect for significant investments or life-changing opportunities. Personalized loan terms. Expert financial advice. Interest rate is 0.15% per day for the period of 300 days.
          </p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Apply for a Loan in Three Easy Steps</h2>
        <ol>
          <li>Complete our simple online application form.</li>
          <li>Receive instant approval notification.</li>
          <li>Get funds deposited directly into your account.</li>
        </ol>
      </section>

      <section className="why-choose">
        <h2>Unlock Financial Freedom: Why Choose Apex Loan?</h2>
        <ul>
          <li><strong>Fast Approval Process:</strong> Get approved in minutes.</li>
          <li><strong>No Collateral Needed:</strong> Your assets remain protected.</li>
          <li><strong>Transparent Loan Terms:</strong> Clear terms without hidden fees.</li>
        </ul>
      </section>

      <section className="customer-feedback">
        <h2>Customer Feedback</h2>
        <div className="feedback">
          <blockquote>
            "Apex Loan made my loan application so easy and stress-free. I received my funds quickly, and the customer service was exceptional. Highly recommend!"
          </blockquote>
          <p>- Mothabisi </p>
        </div>
        <div className="feedback">
          <blockquote>
            "I was impressed by how straightforward the process was. Apex Loan helped me secure the funds I needed without any hassle. Truly a reliable service!"
          </blockquote>
          <p>- Thandiwe </p>
        </div>
      </section>

      <section className="faqs">
        <h2>FAQs</h2>
        <ul>
          <li><strong>What types of loans do you offer?</strong> We provide instant loans ranging from R5,000 to R500,000, tailored to meet various financial needs.</li>
          <li><strong>How do I apply for a loan?</strong> You can apply online through our user-friendly platform, which guides you through each step of the application.</li>
          <li><strong>What are the repayment terms?</strong> Repayment terms vary based on the loan amount and your financial situation, ensuring flexibility.</li>
        </ul>
      </section>

      <section className="contact">
        <h2>Need More Help?</h2>
        <p>Contact us for any additional questions or support.</p>
        <p><strong>Email Us:</strong> Apexloan66@gmail.com  </p>
        
      </section>

      <footer>
        <p>Copyright © 2025 Apex Loan. All rights reserved.</p>
        <p>Apex Loan is a registered financial service provider in South Africa.</p>
      </footer>
    </div>
  );
};

export default Home;
