// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IMyERC20 {
    function mint(address to, uint256 amount) external;
    function burnFrom(address from, uint256 amount) external;

}

contract TokenSale {
    uint256 public ratio;
    IMyERC20 public paymentToken;

    constructor(uint256 _ratio, address _paymentToken) {
        ratio = _ratio;
        paymentToken = IMyERC20(_paymentToken);
    }

    function buyToken() external payable {
        uint256 amount = msg.value / ratio;
        paymentToken.mint(msg.sender, amount);

    }

    function returnTokens(uint256 amount) external {
        paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount * ratio);
    }

}

