package com.backbase.forms.plugins.sample;

import com.aquima.interactions.foundation.IValue;
import com.aquima.interactions.framework.service.ServiceResult;
import com.aquima.interactions.portal.IService;
import com.aquima.interactions.portal.IServiceContext;
import com.aquima.interactions.portal.IServiceResult;
import com.aquima.interactions.portal.ServiceException;
import com.aquima.web.config.annotation.AquimaService;
import com.backbase.expert.forms.extensions.utils.FormsUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@AquimaService("BB_Sample")
public class SampleService implements IService {

    private final static Logger LOG = LoggerFactory.getLogger(SampleService.class);

    @Override
    public IServiceResult handle(IServiceContext serviceContext) throws ServiceException {
        String someParamValue = serviceContext.getParameter("InputParam");
        IValue someEvaluatedParamValue = FormsUtils.getExpressionAttrByParameter(serviceContext, "AttributeRef");
        LOG.debug("This is a param value: {}", someParamValue);
        if(someEvaluatedParamValue != null) {
            LOG.debug("This is an evaluated param value: {}", someEvaluatedParamValue.stringValue());
        }
        else {
            LOG.debug("Value of param AttributeRef could not be evaluated");
        }
        return new ServiceResult("OK");
    }
}
