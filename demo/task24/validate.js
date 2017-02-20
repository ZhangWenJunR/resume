/**
 * Created by MBENBEN on 2017/1/3.
 */
function isLegalUserName(userName) {
    var reg=/^\w{3,10}$/;
    return reg.test(userName);
}
//��д��ĸ��Сд�����֡��»����������֣�6-15���ַ�
function isLegalPwd(password) {
    // ���Գ����Ƕ�����
    if(password.length>20||password.length<6)
        return false;
    // �����Ƿ�������������ַ�����������ַ�
    if(/[^\w]/.test(password))
        return false;
    // �����Ƿ���������
    if(/(^[a-z]+$)|(^[A-Z]+$)|(^\d+$)|(^_+$)/g.test(password))
        return false;
    return true;
}