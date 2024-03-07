

function AccountManagementPage() {

    const accountDetails = {
        businessName: "ABC Pty Ltd",
        businessAddress: "abc street, sydney NSW 2000",
        phoneNumber:"0212345678",
    };

    return(
        <div>
            {JSON.stringify(accountDetails)}
        </div>
    );
};

export default AccountManagementPage;