/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Card, Checkbox, InputNumber, Table } from 'antd';
import { IoClose } from 'react-icons/io5';
import { NumericFormat } from 'react-number-format';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { deleteCartStart, fetchCartByAccountidStart, updateQuantityStart } from '../../../redux/slices/cartSlice';
import { getToken } from '../../../utils/token';
import { addOrderStart } from '../../../redux/slices/orderSlice';
import { addOrderDetailStart } from '../../../redux/slices/orderDetailSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchVourchersStart } from '../../../redux/slices/vourcherSlice';

const DiscountWrapper = styled.div`
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
`;

const DiscountCard = styled(Card)`
    margin-bottom: 8px;
    .ant-card-body {
        padding: 8px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 50px;
    }
`;

const DiscountText = styled.span`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
`;

const ApplyButton = styled(Button)`
    flex-shrink: 0;
`;

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectVoucher, setSelectVoucher] = useState({});
    const { carts } = useSelector((state) => state.carts);
    const token = getToken();

    const cartList = Array.isArray(carts.carts) ? carts.carts : [];

    const Price = ({ value }) => (
        <NumericFormat value={value} displayType={'text'} thousandSeparator="." decimalSeparator="," decimalScale={0} />
    );

    const changeQuantity = (value, id) => {
        dispatch(updateQuantityStart({ id, quantity: value }));
    };

    useEffect(() => {
        dispatch(fetchCartByAccountidStart(token.id));
    }, [dispatch, token.id]);

    const productIdsInCart = cartList.map((cartItem) => cartItem.ProductColor?.productid);

    const { vourchers } = useSelector((state) => state.vourchers);
    const userId = getToken().id;
    console.log(userId);

    const vourcherList = Array.isArray(vourchers?.vourchers)
        ? vourchers.vourchers.filter((voucher) => {
              const hasAccounts = voucher.VoucherAccounts?.length > 0;
              const hasMatchingAccount =
                  hasAccounts && voucher.VoucherAccounts.some((account) => account.account_id === userId)
                      ? true
                      : false;

              const hasProducts = voucher.VoucherProducts?.length > 0;
              const hasMatchingProduct = hasProducts
                  ? voucher.VoucherProducts.some((product) => productIdsInCart.includes(product.product_id))
                  : true;

              return hasMatchingAccount || hasMatchingProduct;
          })
        : [];

    useEffect(() => {
        dispatch(fetchVourchersStart());
    }, [dispatch]);

    const [cartIdArr, setCartIdArr] = useState([]);
    const [productIdArr, setProductIdArr] = useState([]);
    const [totalArr, setTotalArr] = useState([]);
    const [productColoridArr, setProductColoridArr] = useState([]);
    const [quantityArr, setQuantityArr] = useState([]);
    const [priceArr, setPriceArr] = useState([]);

    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (selectVoucher.discount_amount > 0) {
            setDiscount(selectVoucher.discount_amount);
        }
    }, [selectVoucher]);

    const handleChecked = (e, cartid, productid, total, productColorid, quantity, price) => {
        if (e.target.checked) {
            setCartIdArr((prev) => [...prev, cartid]);
            setProductIdArr((prev) => [...prev, productid]);
            setTotalArr((prev) => [...prev, total]);
            setProductColoridArr((prev) => [...prev, productColorid]);
            setQuantityArr((prev) => [...prev, quantity]);
            setPriceArr((prev) => [...prev, price]);
        } else {
            setCartIdArr((prev) => prev.filter((item) => item !== cartid));
            setProductIdArr((prev) => prev.filter((item) => item !== productid));
            setTotalArr((prev) => prev.filter((item) => item !== total));
            setProductColoridArr((prev) => prev.filter((item) => item !== productColorid));
            setQuantityArr((prev) => prev.filter((item) => item !== quantity));
            setPriceArr((prev) => prev.filter((item) => item !== price));
            setDiscount(0);
        }
    };

    const handleApplyDiscount = (discount) => {
        setSelectVoucher(discount);
    };

    console.log(selectVoucher);

    const DiscountList = useMemo(
        () =>
            vourcherList.map((discount) => {
                const hasValidProduct = discount.VoucherProducts?.some((product) =>
                    productIdArr.includes(product.product_id),
                );

                const totalPriceValid = totalArr.reduce((acc, curr) => acc + curr, 0) >= discount.minimum_order_value;

                const hasVoucherAccount =
                    discount.VoucherAccounts.length > 0 && totalArr.reduce((acc, curr) => acc + curr, 0) > 0;

                const canApply =
                    hasValidProduct || (totalPriceValid && discount.minimum_order_value !== null) || hasVoucherAccount;

                return (
                    <DiscountCard key={discount.id} title={discount.code} bordered={false}>
                        <DiscountText>{discount.description}</DiscountText>
                        {canApply && (
                            <ApplyButton onClick={() => handleApplyDiscount(discount)} type="primary" size="small">
                                Áp dụng
                            </ApplyButton>
                        )}
                    </DiscountCard>
                );
            }),
        [vourcherList, productIdArr, totalArr],
    );

    const dataSource = cartList.map((cart) => ({
        key: cart.id,
        checkbox:
            cart.ProductColor.quantity === 0 ? (
                <S.OutOfStockText>Hết hàng</S.OutOfStockText>
            ) : (
                <Checkbox
                    onChange={(e) =>
                        handleChecked(
                            e,
                            cart.id,
                            cart.ProductColor?.productid,
                            cart.ProductColor.Product.price * cart.quantity,
                            cart.ProductColor.id,
                            cart.quantity,
                            cart.ProductColor.Product.price,
                        )
                    }
                />
            ),
        productName: cart.ProductColor.Product.productname,
        image: (
            <img
                src={`${cart.ProductColor.ProductImages[0]?.image}`}
                style={{ width: '50px' }}
                alt={cart.ProductColor.Product.productname}
            />
        ),
        price: (
            <S.PriceText>
                <Price value={cart.ProductColor.Product.price} /> đ
            </S.PriceText>
        ),
        quantity: (
            <InputNumber
                min={1}
                max={cart.ProductColor.quantity}
                onChange={(value) => changeQuantity(value, cart.id)}
                defaultValue={cart.quantity}
                disabled={totalArr.includes(cart.ProductColor.Product.price * cart.quantity)}
                onKeyDown={(e) => e.preventDefault()}
            />
        ),
        total: (
            <S.PriceText>
                <Price value={cart.ProductColor.Product.price * cart.quantity} /> đ
            </S.PriceText>
        ),
        delete: (
            <div>
                <IoClose
                    onClick={() => {
                        if (window.confirm('Bạn muốn xóa sản phẩm này?')) {
                            dispatch(deleteCartStart(cart.id));
                        }
                    }}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        ),
    }));

    const handleConfirm = () => {
        const total = totalArr.reduce((acc, curr) => acc + curr, 0);
        const status = 'Đơn nháp';
        const accountid = token.id;
        const id = uuidv4();
        dispatch(addOrderStart({ id, total, status, accountid, storeid: 'default' }));
        productColoridArr.forEach((item, index) => {
            const cartid = cartIdArr[index];
            const productColorid = productColoridArr[index];
            const quantity = quantityArr[index];
            const price = priceArr[index];
            dispatch(
                addOrderDetailStart({
                    quantity,
                    price,
                    productColorid,
                    orderid: id,
                }),
            );
            dispatch(deleteCartStart(cartid));
        });
        navigate('/pay');
    };

    const columns = [
        {
            title: '',
            dataIndex: 'checkbox',
            key: 'checkbox',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            align: 'right',
        },
    ];

    const payDataSource = [
        {
            key: '1',
            title: 'Giảm giá',
            value: (
                <S.PriceText>
                    <Price value={discount} /> {discount > 100 || discount === 0 ? 'đ' : '%'}
                </S.PriceText>
            ),
        },
        {
            key: '2',
            title: 'Tổng',
            value: (
                <S.PriceText>
                    <Price
                        value={
                            discount > 100 || discount === 0
                                ? totalArr.reduce((acc, curr) => acc + curr, 0) - discount
                                : totalArr.reduce((acc, curr) => acc + curr, 0) * (1 - discount / 100)
                        }
                    />{' '}
                    đ
                </S.PriceText>
            ),
        },
    ];

    const payColumns = [
        {
            title: 'Tổng số lượng',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
            align: 'right',
        },
    ];

    return (
        <S.CartWrapper>
            <S.CartArticle>
                <Table columns={columns} dataSource={dataSource} pagination={false} />
            </S.CartArticle>
            <S.CartAside>
                <Table columns={payColumns} dataSource={payDataSource} pagination={false} />

                {vourcherList.length > 0 && <DiscountWrapper>{DiscountList}</DiscountWrapper>}

                <Button onClick={handleConfirm} type="default" style={{ width: '100%', marginTop: '15px' }}>
                    Xác nhận đơn hàng
                </Button>
            </S.CartAside>
        </S.CartWrapper>
    );
};

export default Cart;
