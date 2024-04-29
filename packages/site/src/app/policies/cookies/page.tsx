import React from "react";

const CookiePolicy = () => {
  return (
    <div className="cookie-policy">
      <h2>Cookie Policy</h2>
      <p>
        This cookie policy explains what cookies are and how we use them on
        trnsprncy.
      </p>
      <h3>What are cookies?</h3>
      <p>
        Cookies are small text files that are placed on your computer or mobile
        device by a website when you visit it. They store information about your
        visit, such as your preferred language and other settings, which can
        make the site easier to use next time you visit.
      </p>
      <h3>How do we use cookies?</h3>
      <p>
        We use Google Tag Manager (GTM) to manage various tracking tools on our
        website. GTM itself does not set cookies unless you are in preview and
        debug mode. However, some tags we deploy through GTM may use cookies.
      </p>
      <h3>What types of cookies do we use?</h3>
      <p>
        Based on the tags you mentioned (functionality_storage,
        personalization_storage, and security_storage), we likely use the
        following types of cookies:
      </p>
      <ul>
        <li>
          <strong>Strictly necessary cookies (security_storage)</strong>: These
          cookies are essential for the website&apos;s security features and to
          help protect user data.
        </li>
        <li>
          <strong>Functionality cookies (functionality_storage)</strong>: These
          cookies help the website function properly by remembering your
          preferences, such as language settings or the size of text displayed.
        </li>
        <li>
          <strong>
            Optional personalization cookies (personalization_storage)
          </strong>
          : We may use personalization cookies to enhance your experience on our
          website. These cookies could store information about your browsing
          history on our site to tailor content or features to your interests.
          However, it&apos;s important to note that you are not required to
          accept these cookies to use our website.
        </li>
      </ul>
      <h3>Do we use third-party cookies?</h3>
      <p>
        No, based on the tags you mentioned, we don&apos;t use third-party
        cookies directly. However, it&apos;s important to note that Google Tag
        Manager itself might set cookies depending on your configuration.
      </p>
      <h3>Can you control cookies?</h3>
      <p>
        Most web browsers allow you to control cookies through their settings.
        You can usually choose to block all cookies, delete existing cookies, or
        receive a notification before a cookie is stored. However, blocking
        cookies may prevent you from fully using all features of our website,
        particularly those related to personalization.
      </p>
      <p>
        For more information about cookies:
        <a href="https://allaboutcookies.org/">Learn more about cookies</a>.
      </p>
      <h3>Changes to this Cookie Policy</h3>
      <p>
        We may update this Cookie Policy from time to time. The updated version
        will be posted on our website.
      </p>
      <h3>Contact Us</h3>
      <p>
        If you have any questions about this Cookie Policy, please contact us at{" "}
        {/* Update with your contact information */}
        <a href="mailto:transparencyui@gmail.com">transparencyui@gmail.com</a>.
      </p>
      {/* Add a link to your cookie consent mechanism (if applicable) */}
      {/* <p>
        For information on managing your cookie preferences, please refer to our{" "}
        <a href="/cookie-consent">Cookie Consent</a> page.
      </p> */}
    </div>
  );
};

export default CookiePolicy;
