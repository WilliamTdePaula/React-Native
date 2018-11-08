import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

const ValidarProps = props => 
    <Text style={{fontSize:35}}>
        {props.label /* || 'teste' */}
        {props.ano + 2000}
    </Text>
    

ValidarProps.defaultProps = {//Se eu definir o label quando chamo a tag ele assumira o valor q eu passar lá
    label: 'Ano: '
}

ValidarProps.propTypes = {//definindo o tipo de propriedades que devo receber
    ano: PropTypes.number.isRequired,
}

export default ValidarProps