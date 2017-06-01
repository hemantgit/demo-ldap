<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<xsl:param name="fileDownloadLink" select="'../FileDownloadController'"/>				
	<xsl:template match="filedownload">
		<button type="button" name="{$idPrefix}{@id}" id="{$idPrefix}{@id}" class="aq-button aq-filedownload">
			<xsl:attribute name="onclick">Runtime.tryDownload(
				this.form,
				'<xsl:value-of select="$idPrefix"/>',
				'<xsl:value-of select="$fileDownloadLink"/>',
				'<xsl:value-of select="$sessionId"/>',
				'<xsl:value-of select="properties/property[@name='configurationid']"/>',
				'<xsl:value-of select="button[@name='Unauthorized']/@id"/>');
			</xsl:attribute>
			<xsl:value-of select="button[@name='downloadButton']/@caption" />
		</button>
	</xsl:template>
</xsl:stylesheet>
